import '../tests_helper';
import { App, Ranking } from '../../db/models';

let app = null;

beforeEach(async () => {
  app = await App.create({
    name: 'MyApp',
  });
});

test('can be associated with an app', async () => {
  const ranking = await Ranking.create({
    appId: app.id,
    date: new Date(),
  });

  const found = await ranking.getApp();
  expect(found.id).toEqual(app.id);
  expect(found.name).toEqual(app.name);
});

test('should require unique dates per-app', async () => {
  const now = new Date();
  await Ranking.create({
    appId: app.id,
    date: now,
  });

  const badRanking = await Ranking.create({
    appId: app.id,
    date: now,
  });

  expect(badRanking.save).toThrow();

  now.setDate(now.getDate() - 1);
  const goodRanking = await Ranking.build({
    appId: app.id,
    date: now,
  });

  await goodRanking.save();
  expect(goodRanking.id).not.toBeNull();
});
