const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  categoryName: {
    name: String,
  },
}, { timestamps: true });

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
