const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const Post = require('../models/Post');

module.exports.getPosts = getPosts;
module.exports.createPost = createPost;
// module.exports.getPostById = getPostById;
// module.exports.updatePost = updatePost;
// module.exports.deletePost = deletePost;

async function getPosts(req, res, next) {
  const { userId, page = 1, limit = 10 } = req.query;
  try {
    const posts = await Post.find({ user: userId })
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await Post.find({ user: userId }).countDocuments();

    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
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
