const userRoutes = require('./user.routes');
const countryRoutes = require('./countryDetails.routes');

module.exports = (app) => {
  userRoutes(app);
  countryRoutes(app);
};
