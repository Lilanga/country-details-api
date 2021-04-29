const router = require('express').Router();
const countryDetailsCtrl = require('../controllers/countryDetails.controller');
const { authenticate } = require('../middleware/authorize');

module.exports = (app) => {
  // Create a new Country Detail
  router.post('/', authenticate, countryDetailsCtrl.createContryDetail);

  // Generate bearer tokens for users
  router.get('/:name', authenticate, countryDetailsCtrl.findCountryDetailsByName);

  // Renew user tokens using refresh token
  router.get('/', authenticate, countryDetailsCtrl.getAllCountryDetails);

  // Delete user by email
  router.delete('/:name', authenticate, countryDetailsCtrl.removeCountryDetailByName);

  app.use('/api/country', router);
};
