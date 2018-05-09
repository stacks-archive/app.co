import '../tests_helper';
import { App } from '../../db/models';

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

describe('enums', () => {
  it('uses enums for categories properly', async () => {
    const app = await App.create({
      name: 'MyApp',
      category: 'Social Networking',
    });

    expect(app.categoryID).toEqual(App.categoryEnums['Social Networking']);
    expect(app.categoryID).not.toBeNull();
    expect(app.category).toEqual('Social Networking');
    app.category = 'Health & Fitness';
    expect(app.categoryID).toEqual(App.categoryEnums['Health & Fitness']);
  });

  it('uses enums for blockchains properly', async () => {
    const app = await App.create({
      name: 'MyApp',
      blockchain: 'Ethereum',
    });

    expect(app.blockchainID).toEqual(App.blockchainEnums.Ethereum);
    expect(app.blockchainID).not.toBeNull();
    expect(app.blockchain).toEqual('Ethereum');
    app.blockchain = 'Bitcoin';
    expect(app.blockchainID).toEqual(App.blockchainEnums.Bitcoin);
  });

  it('uses enums for storage properly', async () => {
    const app = await App.create({
      name: 'MyApp',
      storageNetwork: 'Gaia',
    });

    expect(app.storageNetworkID).toEqual(App.storageEnums.Gaia);
    expect(app.storageNetworkID).not.toBeNull();
    expect(app.storageNetwork).toEqual('Gaia');
    app.storageNetwork = 'IPFS';
    expect(app.storageNetworkID).toEqual(App.storageEnums.IPFS);
  });

  it('uses enums for authentication properly', async () => {
    const app = await App.create({
      name: 'MyApp',
      authentication: 'Blockstack',
    });

    expect(app.authenticationID).toEqual(App.authenticationEnums.Blockstack);
    expect(app.authenticationID).not.toBeNull();
    expect(app.authentication).toEqual('Blockstack');
    app.authentication = 'Ethereum Web3';
    expect(app.authenticationID).toEqual(App.authenticationEnums['Ethereum Web3']);
  });
});
