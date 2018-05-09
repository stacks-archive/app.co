const _ = require('lodash');

const categoryEnums = {
  'Business Tools': 0,
  'Developer Tools': 1,
  'Education & News': 2,
  'Financial Services': 3,
  'Games & Digital Assets': 4,
  'Social Networking': 5,
  'Health & Fitness': 6,
  Marketplaces: 7,
  'Music, Photo & Video': 8,
  Chat: 9,
  'Utilities & Productivity': 10,
  'Documents & Storage': 11,
};

const categoryIDToEnum = _.invert(categoryEnums);

const blockchainEnums = {
  Ethereum: 0,
  EOS: 1,
  Bitcoin: 2,
  Steem: 3,
  'Bitcoin Cash': 4,
};
const blockchainIDToEnum = _.invert(blockchainEnums);

const storageEnums = {
  Gaia: 0,
  IPFS: 1,
  '0x relays': 2,
  Steem: 3,
  ZeroNet: 4,
  DAT: 5,
  BitTorrent: 6,
  'P2P Network': 7,
  Matrix: 8,
};
const storageIDToEnum = _.invert(storageEnums);

const authenticationEnums = {
  Blockstack: 0,
  'Ethereum Web3': 1,
  SteemConnect: 2,
  Civic: 3,
  ZeroNet: 4,
  uPort: 5,
};
const authenticationIDToEnum = _.invert(authenticationEnums);

module.exports = {
  categoryEnums,
  categoryIDToEnum,
  blockchainIDToEnum,
  blockchainEnums,
  storageEnums,
  storageIDToEnum,
  authenticationEnums,
  authenticationIDToEnum,
};
