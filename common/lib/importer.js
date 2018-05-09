import { google } from 'googleapis';
import _ from 'lodash';

import { App } from '../../db/models';

export default class Importer {
  static auth() {
    const oauthClient = new google.auth.OAuth2(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_SECRET);
    oauthClient.setCredentials({
      access_token: process.env.GOOGLE_ACCESS_TOKEN,
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
    return oauthClient;
  }

  static import() {
    return new Promise(async (resolve, reject) => {
      const sheets = google.sheets({ version: 'v4', auth: this.auth() });
      const sheetOptions = {
        spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
        range: 'Dapps!A:I',
      };
      sheets.spreadsheets.values.get(sheetOptions, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(this.transformRows(response.data.values));
        }
      });
    });
  }

  static async transformRows(rows) {
    const headers = rows[0];
    // console.log(headers);
    const headerToAttribute = this.headerToAttribute();
    /* eslint no-plusplus: 0 */
    const appTransactions = _.map(_.slice(rows, 1), (row) => {
      const data = {};
      for (let i = 0; i < row.length; i++) {
        const columnData = row[i];
        const attribute = headerToAttribute[headers[i]];
        data[attribute] = this.transformValue(attribute, columnData);
      }
      return this.makeApp(data);
    });
    const apps = await Promise.all(appTransactions);
    return apps;
  }

  static headerToAttribute() {
    return {
      Name: 'name',
      Category: 'category',
      Blockchains: 'blockchain',
      Website: 'website',
      Storage: 'storageNetwork',
      Authentication: 'authentication',
      'Open Source Client?': 'openSourceUrl',
      'Registration Open?': 'registrationIsOpen',
    };
  }

  static transformValue(attribute, value) {
    if (['blockchain', 'storageNetwork', 'authentication', 'category'].indexOf(attribute) !== -1) {
      // TODO: handle enums
      return null;
    } else if (['registrationIsOpen'].indexOf(attribute) !== -1) {
      return value === 'YES';
    }
    return value;
  }

  static makeApp(data) {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log(data);
        const options = {
          where: { website: data.website },
          defaults: data,
        };
        const [app] = await App.findOrCreate(options);
        await app.update(data);
        resolve(app);
      } catch (error) {
        reject(error);
      }
    });
  }
}
