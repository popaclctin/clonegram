const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const Like = require('../models/Like');

module.exports.createLike = createLike;
module.exports.deleteLike = deleteLike;

async function createLike(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { userId, postId } = req.body;
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
