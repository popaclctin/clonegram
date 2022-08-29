const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const authController = require('../controllers/auth.controller');
const User = require('../models/User');

router.post(
  '/login',
  body('email')
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email is invalid'),
  body('password')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  authController.login
);

router.post(
  '/signup',
  body('email')
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email is invalid')
    .custom(async (value) => {
      let existingUser = await User.findOne({ email: value }).exec();
      if (existingUser) {
        throw new Error('Email already taken');
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  body('username')
    .notEmpty()
    .trim()
    .custom(async (value) => {
      let existingUser = await User.findOne({ username: value }).exec();
      if (existingUser) {
        throw new Error('Username already taken');
      }
      return true;
    }),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  authController.signup
);

module.exports = router;
