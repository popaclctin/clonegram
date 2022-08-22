const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const authController = require('../controllers/authController');

router.post(
  '/login',
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('password').notEmpty().isLength({ min: 6 }),
  authController.login
);

router.post(
  '/signup',
  body('email')
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage('Email is invalid')
    .trim()
    .escape(),
  body('password').notEmpty().isLength({ min: 6 }),
  body('username').notEmpty(),
  authController.signup
);

module.exports = router;
