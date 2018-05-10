import dotenv from 'dotenv';
import 'sepia'; /* eslint import/no-extraneous-dependencies: [0] */

import { sequelize, App, Ranking } from '../db/models';

dotenv.config();

// beforeAll(async () => {
//   await sequelize.sync();
// });

beforeEach(async () => {
  await sequelize.sync();
  await App.truncate({ cascade: true });
  // Ranking.truncate({ cascade: true });
});

const makeApp = async function makeApp(name = 'Cryptokitties', website = 'https://cryptokitties.co') {
  // Make an app
  return new Promise(async (resolve) => {
    const app = await App.create({
      name,
      website,
    });
    resolve(app);
  });
};

export default { makeApp };
