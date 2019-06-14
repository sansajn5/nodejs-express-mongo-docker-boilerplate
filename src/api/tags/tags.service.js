const { Tag } = require('../../database/models');

const getTags = () => Tag.find();

const createTag = async ({ name }) => {
  const tag = new Tag({
    name,
  });

  return tag.save();
};

module.exports = {
  getTags,
  createTag,
};
