const fs = require('fs');
const csv = require('fast-csv');
require('sepia'); /* eslint import/no-extraneous-dependencies: [0] */
require('dotenv').config();

const twitter = require('../common/lib/twitter');

// const { getRank } = require('../common/lib/similarweb.js');

const filename = './common/data/dapps.csv';
const apps = [];

csv
  .fromPath(filename, {
    headers: true,
  })
  .on('data', async (data) => {
    apps.push(data);
  })
  .on('end', async () => {
    await twitter.fetchMentions(apps);

    const writeStream = fs.createWriteStream('./common/data/dapps-ranked.csv');
    csv.write(apps, { headers: true }).pipe(writeStream);

    console.log('done');
  });
