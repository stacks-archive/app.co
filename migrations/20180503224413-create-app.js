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
      category: {
        type: Sequelize.INTEGER,
      },
      website: {
        type: Sequelize.STRING,
      },
      blockchain: {
        type: Sequelize.INTEGER,
      },
      storageNetwork: {
        type: Sequelize.INTEGER,
      },
      authentication: {
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
