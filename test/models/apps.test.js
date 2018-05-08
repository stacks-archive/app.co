import '../tests_helper';
import { App } from '../../models';

it('can fetch from an empty state', async () => {
  const apps = await App.findAll();
  expect(apps.length).toBe(0);
});

it('requires name to be present', async () => {
  const app = await App.build({
    name: null,
  });

  expect(app.save).toThrow();
});
