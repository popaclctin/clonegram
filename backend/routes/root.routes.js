const express = require('express');
const rootRouter = express.Router();
const auth = require('./auth.routes');
const post = require('./post.routes');

rootRouter.use('/auth', auth);
rootRouter.use('/posts', post);

module.exports = rootRouter;
