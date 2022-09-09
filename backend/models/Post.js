const mongoose = require('mongoose');
const fs = require('fs');
const { Schema } = mongoose;
// require('./Comment');
// require('./User');

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    caption: {
      type: String,
      trim: true,
    },
    image: {
      name: String,
      path: String,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Like',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// delete the image from storage
postSchema.pre('deleteOne', async function (next) {
  const docToDelete = await this.model.findOne(this.getQuery());
  fs.unlink(docToDelete.image.path, (err) => {
    if (err) {
      next(err);
    }
  });
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
