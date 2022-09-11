const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');
const Follow = require('../models/Follow');

module.exports.getFollowers = getFollowers;
module.exports.getFollowing = getFollowing;
module.exports.getFollow = getFollow;
module.exports.createFollow = createFollow;
module.exports.deleteFollow = deleteFollow;

async function getFollowers(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { userId } = req.params;
  const { page = 1, limit = 20 } = req.query;

  try {
    const followers = await Follow.find({ followee: userId })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const followersCount = await Follow.countDocuments({
      followee: userId,
    }).exec();

    return res.status(200).json({
      followers: followers,
      totalCount: followersCount,
      totalPages: Math.ceil(followersCount / limit),
      currentPage: page,
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function getFollowing(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { userId } = req.params;
  const { page = 1, limit = 20 } = req.query;

  try {
    const following = await Follow.find({ follower: userId })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const followingCount = await Follow.countDocuments({
      follower: userId,
    }).exec();

    return res.status(200).json({
      following: following,
      totalCount: followingCount,
      totalPages: Math.ceil(followingCount / limit),
      currentPage: page,
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function getFollow(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { userId } = req.params;
  const { followeeId } = req.query;

  try {
    const follow = await Follow.findOne({
      follower: userId,
      followee: followeeId,
    }).exec();

    if (!follow) {
      const httpError = createHttpError(404, 'Follow not found');
      return next(httpError);
    }

    return res.status(200).json({
      follow: follow,
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function createFollow(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const followerId = req.user._id;
  const { userId: followeeId } = req.body;
  try {
    await Follow.create({
      follower: followerId,
      followee: followeeId,
    });
    return res.status(201).json({
      message: 'Follow created',
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}

async function deleteFollow(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { followId } = req.params;

  try {
    await Follow.deleteOne({ _id: followId });
    res.status(200).json({ message: 'Follow deleted' });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}
