const Twitter = require('twitter');
const each = require('async/each');
const whilst = require('async/whilst');
const URL = require('url');
const { Ranking } = require('../../db/models');

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
});

const fetchPage = async function fetchPage(app, options, lastCount, totalMentions, lastId) {
  return new Promise(async (resolve, reject) => {
    // console.log(hostname, lastId);
    if (lastId) {
      options.max_id = lastId;
    }
    twitter.get('search/tweets', options, (error, tweets) => {
      // console.log('RESULT!');
      if (error || !tweets) {
        console.log(error);
        reject(error);
      } else {
        const { statuses } = tweets;
        lastCount = statuses.length;
        totalMentions += statuses.length;
        // console.log(hostname, statuses.length, lastCount);
        if (lastCount === 100) {
          // console.log('lastCount == 100', statuses[99]);
          lastId = statuses[99].id;
        }
        resolve([lastId, lastCount, totalMentions]);
      }
    });
  });
};

const paginateMentions = (app) =>
  new Promise(async (resolve, reject) => {
    let lastCount = 100;
    let lastId = null;
    let totalMentions = 0;

    if (app.website.length > 0) {
      const { hostname } = URL.parse(app.website);
      const options = { q: hostname, count: 100 };
      whilst(
        () => lastCount === 100,
        async (whilstCallback) => {
          try {
            [lastId, lastCount, totalMentions] = await fetchPage(app, options, lastCount, totalMentions, lastId);
            whilstCallback();
          } catch (error) {
            whilstCallback(error);
          }
        },
        (error) => {
          /* eslint no-param-reassign: [0] */
          app.twitterMentions = totalMentions;
          if (error) {
            reject(error);
          } else {
            resolve(totalMentions);
          }
        },
      );
    } else {
      resolve(app);
    }
  });

const saveRanking = (app) =>
  new Promise(async (resolve, reject) => {
    try {
      const totalMentions = await paginateMentions(app);
      const [ranking] = await Ranking.findOrBuild({
        where: {
          appId: app.id,
          date: new Date(),
        },
        defaults: {
          twitterMentions: totalMentions,
        },
      });
      resolve(ranking);
    } catch (error) {
      reject(error);
    }
  });

const fetchMentions = (apps) =>
  new Promise(async (resolve, reject) => {
    each(apps, paginateMentions, (error) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        resolve();
      }
    });
  });

module.exports = {
  fetchMentions,
  paginateMentions,
  saveRanking,
};
