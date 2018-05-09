module.exports = (sequelize, DataTypes) => {
  const Ranking = sequelize.define(
    'Ranking',
    {
      appId: DataTypes.INTEGER,
      twitterMentions: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
    },
    {},
  );

  Ranking.associate = function association(models) {
    Ranking.App = Ranking.belongsTo(models.App);
  };

  return Ranking;
};
