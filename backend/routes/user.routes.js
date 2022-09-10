const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { sanitizeId } = require('../utils/sanitizers');
const authorizeMiddleware = require('../middlewares/authorize');

const userController = require('../controllers/user.controller');
const followController = require('../controllers/follow.controller');
const likeController = require('../controllers/like.controller');
const postController = require('../controllers/post.controller');

router.use(authorizeMiddleware);

router.get('/:username', userController.getUserByUsername);
router.get('/:userId/followers', followController.getFollowers);
router.get('/:userId/followees', followController.getFollowees);
router.get('/:userId/follows', followController.getFollow);
router.get('/:userId/liked', likeController.getLike);
router.get('/:userId/posts', postController.getPosts);

module.exports = router;
