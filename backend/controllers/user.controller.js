const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');
const Post = require('../models/Post');

const User = require('../models/User');

module.exports.followUser = followUser;
module.exports.getPostsByUsername = getPostsByUsername;

async function getPostsByUsername(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }
  const { username } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const user = await User.findOne({ username }).exec();

    if (!user) {
      const httpError = createHttpError(404, 'User not found');
      return next(httpError);
    }

    const posts = await Post.find({ user: user._id })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await Post.find({ user: user._id }).countDocuments().exec();

    res.status(200).json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function followUser(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { userId, followeeId } = req.body;
  try {
    const user = await User.findById(userId).exec();
    user.following.push(followeeId);
    await user.save();

    const followee = await User.findById(followeeId).exec();
    followee.followers.push(userId);
    await followee.save();

    return res.status(200).json({
      message: 'User followed',
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}
