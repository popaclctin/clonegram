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

  const { post, user, page = 1, limit = 20 } = req.query;

  try {
    const likes = await Like.find({ post, user })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await Like.countDocuments({ post, user }).exec();
    res.status(200).json({ likes, totalCount: count });
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

  const { post, user, page = 1, limit = 20 } = req.query;

  try {
    const likes = await Like.find({ post, user })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await Like.countDocuments({ post, user }).exec();
    res.status(200).json({ likes, totalCount: count });
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
  const { post } = req.body;
  try {
    await Like.create({
      user: userId,
      post,
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
