const Twitter = require('twitter');
const each = require('async/each');
const URL = require('url');
const { Ranking } = require('../../db/models');

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
});

const fetchPage = async function fetchPage(app, _options, _lastCount, _totalMentions, _lastId) {
  let [lastId, lastCount, totalMentions] = [_lastCount, _totalMentions, _lastId];
  const options = _options;
  return new Promise(async (resolve, reject) => {
    if (lastId) {
      options.max_id = lastId;
    }
    twitter.get('search/tweets', options, (error, tweets) => {
      if (error || !tweets) {
        reject(error);
      } else {
        const { statuses } = tweets;
        lastCount = statuses.length;
        totalMentions += statuses.length;
        if (lastCount === 100) {
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

    if (app.website && app.website.length > 0) {
      const { hostname } = URL.parse(app.website);
      const options = { q: hostname, count: 100 };
      try {
        while (lastCount === 100) {
          /* eslint no-await-in-loop: [0] */
          [lastId, lastCount, totalMentions] = await fetchPage(app, options, lastCount, totalMentions, lastId);
        }
        resolve(totalMentions);
      } catch (error) {
        reject(error);
      }
    } else {
      resolve(totalMentions);
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
