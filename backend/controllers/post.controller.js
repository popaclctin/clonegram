const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const Post = require('../models/Post');

module.exports.getPosts = getPosts;
module.exports.createPost = createPost;
// module.exports.getPostById = getPostById;
// module.exports.updatePost = updatePost;
// module.exports.deletePost = deletePost;

async function getPosts(req, res, next) {
  const userId = req.params.userId;
  try {
    const posts = await Post.find({ _id: userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function createPost(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { userId, caption } = req.body;
  try {
    await Post.create({
      user: userId,
      caption,
      image_path: req.file.path,
    });
    return res.status(201).json({
      message: 'Post created',
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}
