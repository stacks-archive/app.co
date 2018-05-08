// const { google } = require('googleapis');
require('dotenv').config();
require('babel-register');
require('babel-polyfill');

process.env.VCR_MODE = 'replay';
require('sepia'); /* eslint import/no-extraneous-dependencies: [0] */
const Importer = require('../common/lib/importer').default;

Importer.import().then(() => {
  console.log('done!');
});
