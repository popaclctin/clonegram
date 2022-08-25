const mongoose = require('mongoose');
const fs = require('fs');
const { Schema } = mongoose;

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
    image_path: {
      type: String,
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
  fs.unlink(docToDelete.image_path, (err) => {
    if (err) {
      next(err);
    }
  });
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
