const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');
const Post = require('../models/Post');

const User = require('../models/User');

module.exports.getUserByUsername = getUserByUsername;

async function getUserByUsername(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).exec();

    if (!user) {
      const httpError = createHttpError(404, 'User not found');
      return next(httpError);
    }

    res.status(200).json({
      user,
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}
