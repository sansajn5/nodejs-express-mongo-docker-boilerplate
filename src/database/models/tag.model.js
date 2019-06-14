const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
  },
}, { timestamps: true });

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
