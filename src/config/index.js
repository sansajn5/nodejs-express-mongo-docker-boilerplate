const env = process.env.NODE_ENV || 'dev';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`./${env}.config`);

module.exports = config;
