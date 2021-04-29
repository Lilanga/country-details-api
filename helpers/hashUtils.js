const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hashSettings, tokenSettings } = require('../config/auth.config');

exports.generateHash = (password) => bcrypt.hashSync(password, hashSettings.saltCycles);

// create a jwt token containing the user email
const generateJwtToken = (user) => jwt.sign(
  { sub: user.email, id: user.email, email: user.email },
  tokenSettings.secret, { expiresIn: tokenSettings.tokenLife },
);

// create a refresh token
const generateRefreshToken = (user) => jwt.sign(
  { sub: user.email, id: user.email, email: user.email },
  tokenSettings.refreshTokenSecret, { expiresIn: tokenSettings.refreshTokenLife },
);

// Generate auth tokens for the given user
exports.generateAuthTokens = (user) => {
  const jwtToken = generateJwtToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    jwtToken,
    refreshToken,
  };
};

// Validate given auth token
exports.validateAuthToken = (authToken) => new Promise((resolve, reject) => {
  jwt.verify(authToken, tokenSettings.secret, (err, user) => {
    if (err) reject(err);
    resolve(user);
  });
});

// validate given refresh token
exports.validateRefershToken = (authToken) => new Promise((resolve, reject) => {
  jwt.verify(authToken, tokenSettings.refreshTokenSecret, (err, user) => {
    if (err) reject(err);
    resolve(user);
  });
});
