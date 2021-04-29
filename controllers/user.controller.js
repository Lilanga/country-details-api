const winstonLogger = require('../config/winston.config');
const {
  createUser, authenticate, findUserByEmail, removeUserByEmail, refreshTokens,
} = require('../services/users.service');

// create a user using the payload body parameters
exports.create = (req, resp) => {
  const { email, password } = req.body;
  if (!email || !password) {
    winstonLogger.error('missing parameter: email and password cannot be empty.');
    resp.status(400).send({
      message: 'missing parameter: e-mail and password cannot be empty.',
    });
    return;
  }

  createUser(email, password).then((status) => { resp.status(201).send({ message: `User ${status.email} created successfully.` }); }).catch((err) => {
    winstonLogger.error(err);
    resp.status(500).send({
      message: err.message,
    });
  });
};

// Authenticate user using email and password
exports.authenticate = (req, resp) => {
  const { email, password } = req.body;
  if (!email || !password) {
    winstonLogger.error('missing parameter: email and password cannot be empty.');
    resp.status(400).send({
      message: 'missing parameter: e-mail and password cannot be empty.',
    });
    return;
  }

  authenticate(email, password).then((status) => { resp.send(status); }).catch((err) => {
    winstonLogger.error(err);
    resp.status(500).send({
      message: err.message,
    });
  });
};

exports.refreshTokens = (req, resp) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    winstonLogger.error('missing parameter: refreshToken cannot be empty.');
    resp.status(400).send({
      message: 'missing parameter: refreshToken cannot be empty.',
    });
    return;
  }

  refreshTokens(refreshToken).then((status) => { resp.send(status); }).catch((err) => {
    winstonLogger.error(err);
    resp.status(500).send({
      message: err.message,
    });
  });
};

// find a user by given email id
exports.findByEmail = (req, resp) => {
  const { email } = req.params;

  if (!email) {
    winstonLogger.error('Missing parameter: email cannot be empty');
    resp.status(400).send({
      message: 'Email cannot be empty!',
    });
    return;
  }

  findUserByEmail(email).then((user) => { resp.send({ email: user.email }); }).catch((err) => {
    winstonLogger.error(err);
    resp.status(500).send({
      message: err.message,
    });
  });
};

// remove users by given email
exports.removeByEmail = (req, resp) => {
  const { email } = req.query;

  if (!email) {
    winstonLogger.error('Missing parameter: email cannot be empty');
    resp.status(400).send({
      message: 'Email cannot be empty!',
    });
    return;
  }

  removeUserByEmail(email).then((status) => { resp.send(status); }).catch((err) => {
    winstonLogger.error(err);
    resp.status(500).send({
      message: err.message,
    });
  });
};
