const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { sanitizeId } = require('../utils/sanitizers');
const authorizeMiddleware = require('../middlewares/authorize');

const userController = require('../controllers/user.controller');

router.use(authorizeMiddleware);

router.get('/:username', userController.getPostsByUsername);
router.post('/:username/follow', userController.followUser);
router.delete('/:username/follow', userController.unfollowUser);

module.exports = router;
