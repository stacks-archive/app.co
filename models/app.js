module.exports = (sequelize, DataTypes) => {
  const App = sequelize.define(
    'App',
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      category: DataTypes.INTEGER,
      website: DataTypes.STRING,
      blockchain: DataTypes.INTEGER,
      storageNetwork: DataTypes.INTEGER,
      authentication: DataTypes.INTEGER,
      openSourceUrl: DataTypes.STRING,
      registrationIsOpen: DataTypes.BOOLEAN,
      trackingIsBlocked: DataTypes.BOOLEAN,
    },
    {},
  );
  App.associate = function associations() {
    // associations can be defined here
  };
  return App;
};
