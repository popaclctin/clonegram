const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const User = require('../models/User');

module.exports.followUser = followUser;

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
