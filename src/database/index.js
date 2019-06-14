const mongoose = require('mongoose');
const config = require('../config/index');

const dbConnectionString = config.db;

const connect = () => mongoose.connect(dbConnectionString);

module.exports = {
  connect,
};
