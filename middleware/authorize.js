const { validateAuthToken } = require('../helpers/hashUtils');

// eslint-disable-next-line consistent-return
exports.authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader == null) return res.status(401).json({ message: 'Unauthorized' });

  validateAuthToken(authHeader.replace('Bearer ', '')).then((user) => {
    req.user = user;
    return next();
  }).catch((err) => res.status(401).json({ message: err.message }));
};
