const express = require('express');
const router = express.Router();
const authorizeMiddleware = require('../middlewares/authorize');

const followController = require('../controllers/follow.controller');

router.use(authorizeMiddleware);

router.post('/', followController.createFollow);
router.delete('/:followId', followController.deleteFollow);

module.exports = router;
