const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const User = require('../models/User');
const Post = require('../models/Post');

module.exports.getFeed = getFeed;

async function getFeed(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const user = await User.findById(userId).exec();

    const feedPosts = await Post.find({
      user: { $in: user.following },
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await Post.find({
      user: { $in: user.following },
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
