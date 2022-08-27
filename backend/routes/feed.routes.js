const express = require('express');
const router = express.Router();

const feedController = require('../controllers/feed.controller');

router.get('/:userId', feedController.getFeed);

module.exports = router;
