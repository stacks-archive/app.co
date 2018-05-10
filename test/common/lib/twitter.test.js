import helpers from '../../tests_helper';
import { paginateMentions, saveRanking } from '../../../common/lib/twitter';

test.skip('fetches the total number of mentions for an app', async () => {
  const app = await helpers.makeApp();

  const totalMentions = await paginateMentions(app);
  expect(totalMentions).toBeGreaterThan(100);
});

test.skip('saves a ranking model for an app', async () => {
  const app = await helpers.makeApp();

  const ranking = await saveRanking(app);
  expect(ranking.appId).toEqual(app.id);
  expect(ranking.twitterMentions).not.toBeNull();
});
