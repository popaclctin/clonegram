const express = require('express');
const router = express.Router();
const { query, body, param } = require('express-validator');
const upload = require('../middlewares/upload');
const { sanitizeId } = require('../utils/sanitizers');
const authorizeMiddleware = require('../middlewares/authorize');
const postController = require('../controllers/post.controller');

router.use(authorizeMiddleware);

router.get(
  '/:postId',
  param('postId').notEmpty().customSanitizer(sanitizeId),
  postController.getPostById
);
router.post('/', upload.single('image'), postController.createPost);
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
