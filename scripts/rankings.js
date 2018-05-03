const fs = require("fs");
const csv = require("fast-csv");
require("sepia"); /* eslint import/no-extraneous-dependencies: [0] */

require("dotenv").config();

const twitter = require("../lib/twitter");

// const { getRank } = require('../lib/similarweb.js');

const filename = "./data/dapps.csv";
const apps = [];

csv
  .fromPath(filename, {
    headers: true
  })
  .on("data", async data => {
    apps.push(data);
  })
  .on("end", async () => {
    await twitter.fetchMentions(apps);

    const writeStream = fs.createWriteStream("./data/dapps-ranked.csv");
    csv.write(apps, { headers: true }).pipe(writeStream);

    console.log("done");
  });
