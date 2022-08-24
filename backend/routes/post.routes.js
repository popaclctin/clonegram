const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const upload = require('../middlewares/upload');
const { sanitizeId } = require('../utils/sanitizers');

const postController = require('../controllers/post.controller');

// router.post(
//   '/:id',
//   body('email')
//     .notEmpty()
//     .isEmail()
//     .normalizeEmail()
//     .withMessage('Email is invalid'),
//   body('password')
//     .notEmpty()
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 characters long'),
//   postController.getPostById
// );

router.post(
  '/',
  body('userId').notEmpty().customSanitizer(sanitizeId),
  //TODO: to continue the validation
  upload.single('image'),
  postController.createPost
);

module.exports = router;
