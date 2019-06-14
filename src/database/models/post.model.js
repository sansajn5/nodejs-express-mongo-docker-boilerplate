const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = require('./user.model');

// TODO Replace with enum if there is time
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
    value: Number,
    ratedBy: String,
  }],
}, { timestamps: true });

postSchema.post('save', (post) => {
  User.findOne({ email: post.authorName }, (err, user) => {
    // eslint-disable-next-line no-underscore-dangle
    user.posts.push(post._id);
    user.save();
  });
});

const Post = mongoose.model('Post', postSchema);

module.exports = {
  Post,
  postStatus,
};
