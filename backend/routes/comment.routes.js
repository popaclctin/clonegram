const express = require('express');
const router = express.Router();
const { query, body, param } = require('express-validator');
const { sanitizeId } = require('../utils/sanitizers');
const authorizeMiddleware = require('../middlewares/authorize');
const commentController = require('../controllers/comment.controller');

router.use(authorizeMiddleware);

router.get(
  '/',
  query('postId').customSanitizer(sanitizeId),
  commentController.getAllComments
);
router.post('/', commentController.createComment);
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
