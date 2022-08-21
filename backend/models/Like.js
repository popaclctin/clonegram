const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Post is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;
