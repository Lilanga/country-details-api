const router = require('express').Router();
const usersCtrl = require('../controllers/user.controller.js');
const { authenticate } = require('../middleware/authorize');

module.exports = (app) => {
  // Create a new User
  router.post('/signup', usersCtrl.create);

  // Generate bearer tokens for users
  router.post('/token', usersCtrl.authenticate);

  // Renew user tokens using refresh token
  router.post('/token-refresh', usersCtrl.refreshTokens);

  // Retrieve user with email
  router.get('/:email', authenticate, usersCtrl.findByEmail);

  // Delete user by email
  router.delete('/:email', authenticate, usersCtrl.removeByEmail);

  app.use('/api/users', router);
};
