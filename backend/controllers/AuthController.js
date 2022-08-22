const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/User');

module.exports.login = login;
module.exports.signup = signup;

async function login(req, res) {}

async function signup(req, res) {
  //check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, username, password } = req.body;

  //check if the email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send('Email already taken');
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await User.create({
    email,
    username,
    hashedPassword,
  });

  return res.status(201).json({
    status: 'success',
    data: 'Account created successfully. Please log in',
  });
}
