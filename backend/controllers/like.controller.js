const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const Like = require('../models/Like');

module.exports.getLikes = getLikes;
module.exports.getLike = getLike;
module.exports.createLike = createLike;
module.exports.deleteLike = deleteLike;

async function getLikes(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { postId } = req.params;
  const { page = 1, limit = 20 } = req.query;

  try {
    const likes = await Like.find({ post: postId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await Like.countDocuments({ post: postId }).exec();

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

async function getLike(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { userId } = req.params;
  const { postId } = req.query;

  try {
    const like = await Like.findOne({ post: postId, user: userId }).exec();

    if (!like) {
      const httpError = createHttpError(404, 'Like not found');
      return next(httpError);
    }

    res.status(200).json({
      like,
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function createLike(req, res, next) {
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
