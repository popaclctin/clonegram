const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const Comment = require('../models/Comment');

module.exports.getComments = getComments;
module.exports.createComment = createComment;
module.exports.updateComment = updateComment;
module.exports.deleteComment = deleteComment;

async function getComments(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { postId } = req.params;
  const { page = 1, limit = 15 } = req.query;

  try {
    const comments = await Comment.find({
      post: postId,
    })
      .populate('user', 'username')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await Comment.countDocuments({ post: postId }).exec();
    return res.status(200).json({
      comments,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function createComment(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const userId = req.user._id;
  const { postId, content } = req.body;
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
