const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const authController = require('../controllers/auth.controller');

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
    .withMessage('Email is invalid'),
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
  body('username').notEmpty().trim(),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  authController.signup
);

module.exports = router;
