const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const User = require('../models/User');
const Post = require('../models/Post');
const Follow = require('../models/Follow');

module.exports.getFeed = getFeed;

async function getFeed(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const userId = req.user._id;
  const { page = 1, limit = 10 } = req.query;

  try {
    const following = await Follow.find(
      { follower: userId },
      'followee'
    ).exec();

    const followingIds = following.map((follow) => follow.followee);

    const feedPosts = await Post.find({
      $or: [{ user: { $in: followingIds } }, { user: userId }],
    })
      .populate({ path: 'user', select: 'username' })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await Post.find({
      $or: [{ user: { $in: followingIds } }, { user: userId }],
    }).countDocuments();

    res.status(200).json({
      posts: feedPosts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}
