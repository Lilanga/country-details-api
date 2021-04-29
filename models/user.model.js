module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    email: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
    },
  },
  {
    // no auto timestamp support
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  });

  return User;
};
