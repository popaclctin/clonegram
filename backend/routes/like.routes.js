const express = require('express');
const router = express.Router();
const { body, param, query } = require('express-validator');
const { sanitizeId } = require('../utils/sanitizers');
const authorizeMiddleware = require('../middlewares/authorize');
const likeController = require('../controllers/like.controller');

router.use(authorizeMiddleware);

router.post('/', likeController.createLike);

router.delete('/:likeId', likeController.deleteLike);
module.exports = router;
