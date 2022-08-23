const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
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
    const httpError = createHttpError(400, errors);
    return next(httpError);
  }

  const { email, password } = req.body;

  try {
    //find the account
    const user = await User.findOne({ email });
    const validPassword = user && (await user.comparePassword(password));
    if (!validPassword) {
      const httpError = createHttpError(400, 'Invalid email or password');
      return next(httpError);
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
    const httpError = createHttpError(400, error);
    return next(httpError);
  }
}

async function signup(req, res) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password, firstName, lastName } = req.body;

  //check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send('Email already taken');
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
    status: 'success',
    message: 'Account created',
  });
}
