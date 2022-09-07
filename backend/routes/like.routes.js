const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { sanitizeId } = require('../utils/sanitizers');
const authorizeMiddleware = require('../middlewares/authorize');
const likeController = require('../controllers/like.controller');

router.use(authorizeMiddleware);

router.get(
  '/',
  query('post').notEmpty().customSanitizer(sanitizeId),
  query('user').customSanitizer(sanitizeId),
  likeController.getAllLikes
);

router.post(
  '/',
  body('post').notEmpty().customSanitizer(sanitizeId),
  likeController.createPostLike
);
router.delete(
  '/:likeId',
  param('likeId').notEmpty().customSanitizer(sanitizeId),
  likeController.deleteLike
);
module.exports = router;
