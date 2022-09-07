const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const Like = require('../models/Like');

module.exports.getAllLikes = getAllLikes;
module.exports.createPostLike = createPostLike;
module.exports.deleteLike = deleteLike;

async function getAllLikes(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { postId, userId, page = 1, limit = 20 } = req.query;

  const queryArgs = userId ? { post: postId, user: userId } : { post: postId };

  try {
    const likes = await Like.find(queryArgs)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await Like.countDocuments(queryArgs).exec();
    res.status(200).json({
      likes,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function createPostLike(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const userId = req.user._id;
  const { postId } = req.body;
  try {
    await Like.create({
      user: userId,
      post: postId,
    });
    return res.status(201).json({
      message: 'Like created',
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function deleteLike(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }
  const { likeId } = req.params;

  try {
    await Like.deleteOne({ _id: likeId }).exec();
    res.status(200).json({ message: 'Like deleted' });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}
