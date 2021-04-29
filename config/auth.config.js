exports.tokenSettings = {
  secret: process.env.SECRET,
  refreshTokenSecret: process.env.REFRESHTOKENSECRET,
  tokenLife: process.env.TOKENLIFE,
  refreshTokenLife: process.env.REFRESHTOKENLIFE,
};

exports.hashSettings = {
  saltCycles: 8,
};
