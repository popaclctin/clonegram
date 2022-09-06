const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { sanitizeId } = require('../utils/sanitizers');
const authorizeMiddleware = require('../middlewares/authorize');

const userController = require('../controllers/user.controller');

router.use(authorizeMiddleware);

router.get('/:username', userController.getPostsByUsername);
router.post(
  '/follow',
  body('userId').notEmpty().customSanitizer(sanitizeId),
  body('followeeId').notEmpty().customSanitizer(sanitizeId),
  userController.followUser
);

module.exports = router;
