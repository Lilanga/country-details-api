module.exports = (sequelize, Sequelize) => {
  const CountryDetail = sequelize.define('countrydetails', {
    name: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    gmtOffset: {
      type: Sequelize.DECIMAL,
    },
  },
  {
    // no auto timestamp support
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });

  return CountryDetail;
};
