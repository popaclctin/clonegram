const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { sanitizeId } = require('../utils/sanitizers');
const authorizeMiddleware = require('../middlewares/authorize');
const likeController = require('../controllers/like.controller');

router.use(authorizeMiddleware);

router.get('/', query('postId').notEmpty(), likeController.getAllLikes);

router.post(
  '/',
  body('postId').notEmpty().customSanitizer(sanitizeId),
  likeController.createPostLike
);

router.delete(
  '/:likeId',
  param('likeId').notEmpty().customSanitizer(sanitizeId),
  likeController.deleteLike
);
module.exports = router;
