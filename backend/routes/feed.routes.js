const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const { sanitizeId } = require('../utils/sanitizers');
const authorizeMiddleware = require('../middlewares/authorize');
const feedController = require('../controllers/feed.controller');

router.use(authorizeMiddleware);

router.get('/', feedController.getFeed);

module.exports = router;
