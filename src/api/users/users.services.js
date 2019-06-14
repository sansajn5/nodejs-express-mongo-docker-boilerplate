const { User } = require('./../../database/models');

const getAll = () => User.find();

module.exports = {
  getAll,
};
