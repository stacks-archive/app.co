const _ = require('lodash');
const ENUMS = require('./constants/app-constants');

module.exports = (sequelize, DataTypes) => {
  const App = sequelize.define('App', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    categoryID: DataTypes.INTEGER,
    website: DataTypes.STRING,
    blockchainID: DataTypes.INTEGER,
    storageNetworkID: DataTypes.INTEGER,
    authenticationID: DataTypes.INTEGER,
    openSourceUrl: DataTypes.STRING,
    registrationIsOpen: DataTypes.BOOLEAN,
    trackingIsBlocked: DataTypes.BOOLEAN,
    category: {
      type: DataTypes.VIRTUAL,
      get() {
        return ENUMS.categoryIDToEnum[this.get('categoryID')];
      },
      set(value) {
        this.setDataValue('categoryID', ENUMS.categoryEnums[value]);
      },
    },
    blockchain: {
      type: DataTypes.VIRTUAL,
      get() {
        return ENUMS.blockchainIDToEnum[this.get('blockchainID')];
      },
      set(value) {
        this.setDataValue('blockchainID', ENUMS.blockchainEnums[value]);
      },
    },
    storageNetwork: {
      type: DataTypes.VIRTUAL,
      get() {
        return ENUMS.storageIDToEnum[this.get('storageNetworkID')];
      },
      set(value) {
        this.setDataValue('storageNetworkID', ENUMS.storageEnums[value]);
      },
    },
    authentication: {
      type: DataTypes.VIRTUAL,
      get() {
        return ENUMS.authenticationIDToEnum[this.get('authenticationID')];
      },
      set(value) {
        this.setDataValue('authenticationID', ENUMS.authenticationEnums[value]);
      },
    },
  });
  App.associate = function associations(models) {
    App.Rankings = App.hasMany(models.Ranking, { foreignKey: 'appId' });
    App.findAllWithRankings = () =>
      App.findAll({
        include: [
          {
            model: models.Ranking,
            order: [['date', 'DESC']],
            limit: 1,
          },
        ],
      });
  };

  _.extend(App, ENUMS);

  return App;
};
