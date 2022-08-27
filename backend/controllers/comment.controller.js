const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const Comment = require('../models/Comment');

module.exports.createComment = createComment;
module.exports.updateComment = updateComment;
module.exports.deleteComment = deleteComment;

async function createComment(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { userId, postId, content } = req.body;
  try {
    await Comment.create({
      user: userId,
      post: postId,
      content,
    });
    return res.status(201).json({
      message: 'Comment created',
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function updateComment(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    ).exec();
    res.status(200).json(updatedComment);
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function deleteComment(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }
  const { commentId } = req.params;

  try {
    await Comment.deleteOne({ _id: commentId }).exec();
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}
