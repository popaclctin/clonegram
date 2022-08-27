const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configuration/config');
const { validationResult } = require('express-validator');
const createHttpError = require('http-errors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/User');

module.exports.login = login;
module.exports.signup = signup;

async function login(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { email, password } = req.body;

  try {
    //find the account
    const user = await User.findOne({ email }).exec();
    const validPassword = user && (await user.comparePassword(password));
    if (!validPassword) {
      return next(createHttpError(400, 'Invalid email or password'));
    }

    const payload = {
      id: user._id,
    };

    //generate an id Token
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: '1d',
    });

    return res.status(200).json({
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  } catch (error) {
    return next(createHttpError(500, error));
  }
}

async function signup(req, res, next) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const httpError = createHttpError(400, { invalidParams: errors.array() });
    return next(httpError);
  }

  const { email, username, password, firstName, lastName } = req.body;

  try {
    //check if the email already exists
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return next(createHttpError(400, 'Email already taken'));
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({
      email,
      username,
      password: hashedPassword,
      name: {
        first: firstName,
        last: lastName,
      },
    });

    return res.status(201).json({
      message: 'Account created',
    });
  } catch (err) {
    return next(createHttpError(500, err));
  }
}
