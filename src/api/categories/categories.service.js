const { Category } = require('../../database/models');

const getCategories = () => Category.find();

module.exports = {
  getCategories,
};
