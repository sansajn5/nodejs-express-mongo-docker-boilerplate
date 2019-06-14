const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
  body: {
    type: String,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
