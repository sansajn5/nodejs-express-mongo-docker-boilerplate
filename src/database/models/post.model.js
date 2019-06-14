const mongoose = require('mongoose');

const { Schema } = mongoose;

const postStatus = [
  'publish',
  'draft',
];

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: postStatus,
  },
  body: {
    type: String,
    default: '',
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  rates: [{
    type: Number,
    ratedBy: String,
  }],
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
