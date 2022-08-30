const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const User = require('../models/User');

module.exports.searchUser = searchUser;

async function searchUser(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { query, page = 1, limit = 10 } = req.query;
  try {
    //search by username, firstname or lastname
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { 'name.first': { $regex: query, $options: 'i' } },
        { 'name.last': { $regex: query, $options: 'i' } },
      ],
    })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { 'name.first': { $regex: query, $options: 'i' } },
        { 'name.last': { $regex: query, $options: 'i' } },
      ],
    })
      .countDocuments()
      .exec();

    res.status(200).json({
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}
