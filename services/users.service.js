const bcrypt = require('bcryptjs');
const db = require('../models');
const { generateHash, generateAuthTokens, validateRefershToken } = require('../helpers/hashUtils');

const { users } = db;
// const { Op } = db.Sequelize;

// authenticate credentials
// authenticate credentials
exports.authenticate = (email, password) => new Promise((resolve, reject) => {
  if (!email || !password) {
    reject(new Error('missing parameter: email and password cannot be empty.'));
  }

  users.findByPk(email)
    .then((user) => {
      if (!user || !bcrypt.compareSync(password, user.password)) {
        reject(new Error('Username or password is incorrect'));
      }

      const authTokens = generateAuthTokens(user);
      resolve({
        user: user.email,
        ...authTokens,
      });
    })
    .catch((err) => {
      reject(err);
    });
});

exports.refreshTokens = (refreshToken) => new Promise((resolve, reject) => {
  if (!refreshToken) {
    reject(new Error('missing parameter: refresh token be empty.'));
  }

  validateRefershToken(refreshToken).then((user) => {
    const authTokens = generateAuthTokens(user);
    resolve({
      user: user.email,
      ...authTokens,
    });
  }).catch((err) => {
    reject(err);
  });
});

// create a new user in the database
exports.createUser = (email, password) => new Promise((resolve, reject) => {
  if (!email || !password) {
    reject(new Error('missing parameter: email and password cannot be empty.'));
  }

  const hash = generateHash(password);
  const user = {
    email,
    password: hash,
  };

  users.create(user).then((data) => resolve(data)).catch((err) => { reject(err); });
});

// find users using given email
exports.findUserByEmail = (email) => new Promise((resolve, reject) => {
  if (!email) {
    reject(new Error('Missing parameter: email cannot be empty'));
  }

  users.findByPk(email)
    .then((data) => resolve(data))
    .catch((err) => {
      reject(err);
    });
});

// remove users using given email
exports.removeUserByEmail = (email) => new Promise((resolve, reject) => {
  if (!email) {
    reject(new Error('Missing parameter: email cannot be empty'));
  }

  users.destroy({
    where: { email },
  }).then((num) => {
    if (num === 1) {
      resolve({ message: 'User was deleted successfully!' });
    }
    reject(new Error(`Cannot delete user with email=${email}.`));
  })
    .catch((err) => {
      reject(err);
    });
});
