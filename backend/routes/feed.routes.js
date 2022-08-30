const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { sanitizeId } = require('../utils/sanitizers');

const feedController = require('../controllers/feed.controller');

router.get(
  '/:userId',
  param('userId').notEmpty().customSanitizer(sanitizeId),
  feedController.getFeed
);

module.exports = router;
