const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { sanitizeId } = require('../utils/sanitizers');

const likeController = require('../controllers/like.controller');

router.post(
  '/',
  body('userId').notEmpty().customSanitizer(sanitizeId),
  body('postId').notEmpty().customSanitizer(sanitizeId),
  likeController.createLike
);
router.delete(
  '/:likeId',
  param('likeId').notEmpty().customSanitizer(sanitizeId),
  likeController.deleteLike
);
module.exports = router;
