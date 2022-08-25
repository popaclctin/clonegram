const express = require('express');
const router = express.Router();
const { query, body, param } = require('express-validator');
const upload = require('../middlewares/upload');
const { sanitizeId } = require('../utils/sanitizers');

const postController = require('../controllers/post.controller');

router.get(
  '/',
  query('userId').notEmpty().customSanitizer(sanitizeId),
  postController.getPosts
);
router.get(
  '/:postId',
  param('postId').notEmpty().customSanitizer(sanitizeId),
  postController.getPostById
);
router.post(
  '/',
  upload.single('image'),
  body('userId').notEmpty().customSanitizer(sanitizeId),
  postController.createPost
);
router.patch(
  '/:postId',
  param('postId').notEmpty().customSanitizer(sanitizeId),
  postController.updatePost
);
router.delete(
  '/:postId',
  param('postId').notEmpty().customSanitizer(sanitizeId),
  postController.deletePost
);
module.exports = router;
