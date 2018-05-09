module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Apps', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      categoryID: {
        type: Sequelize.INTEGER,
      },
      website: {
        type: Sequelize.STRING,
      },
      blockchainID: {
        type: Sequelize.INTEGER,
      },
      storageNetworkID: {
        type: Sequelize.INTEGER,
      },
      authenticationID: {
        type: Sequelize.INTEGER,
      },
      openSourceUrl: {
        type: Sequelize.STRING,
      },
      registrationIsOpen: {
        type: Sequelize.BOOLEAN,
      },
      trackingIsBlocked: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('Apps'),
};
