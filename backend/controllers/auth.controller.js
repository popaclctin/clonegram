const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/User');

module.exports.login = login;
module.exports.signup = signup;

async function login(req, res) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  //find the account
  const user = await User.findOne({ email }, 'email password');

  const checkPassword = user && (await user.comparePassword(password));

  if (!checkPassword) {
    return res.status(400).send('Invalid email or password');
  }

  const payload = {
    id: user._id,
    username: user.username,
  };

  //generate a token valid for 1 hour
  jwt.sign(
    payload,
    jwtSecret,
    {
      expiresIn: '1d',
    },
    (error, token) => {
      if (error) throw error;
      return res.status(200).json({
        status: 'success',
        data: { token, user: payload },
        message: 'Login successfull',
      });
    }
  );
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