const express = require('express');
const router = express.Router();
const { query, body, param } = require('express-validator');
const upload = require('../middlewares/upload');
const { sanitizeId } = require('../utils/sanitizers');
const authorizeMiddleware = require('../middlewares/authorize');
const postController = require('../controllers/post.controller');
const commentsController = require('../controllers/comment.controller');
const likesController = require('../controllers/like.controller');

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
router.get(
  '/:postId/comments',
  param('postId').notEmpty().customSanitizer(sanitizeId),
  commentsController.getComments
);
router.get(
  '/:postId/likes',
  param('postId').notEmpty().customSanitizer(sanitizeId),
  likesController.getLikes
);
module.exports = router;
