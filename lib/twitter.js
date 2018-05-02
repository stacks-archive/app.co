const Twitter = require('twitter');
const each = require('async/each');
const whilst = require('async/whilst');
const URL = require('url');

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
});

const paginateMentions = (app, callback) => {
  let lastCount = 100;
  let lastId = null;
  let totalMentions = 0;

  if (app.Website.length > 0) {
    const { hostname } = URL.parse(app.Website);
    const options = { q: hostname, count: 100 };
    whilst(
      () => lastCount === 100,
      (whilstCallback) => {
        // console.log(hostname, lastId);
        if (lastId) {
          options.max_id = lastId;
        }
        twitter.get('search/tweets', options, (error, tweets) => {
          // console.log('RESULT!');
          if (error || !tweets) {
            console.log(error);
            whilstCallback(error);
          } else {
            const { statuses } = tweets;
            lastCount = statuses.length;
            totalMentions += statuses.length;
            // console.log(hostname, statuses.length, lastCount);
            if (lastCount === 100) {
              // console.log('lastCount == 100', statuses[99]);
              lastId = statuses[99].id;
            }
            whilstCallback();
          }
        });
      },
      (error) => {
        /* eslint no-param-reassign: [0] */
        app['Twitter Mentions'] = totalMentions;
        callback(error);
      },
    );
  } else {
    callback();
  }
};

const fetchMentions = apps => new Promise(async (resolve, reject) => {
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
};

