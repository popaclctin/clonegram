const express = require('express');
const rootRouter = express.Router();
const auth = require('./auth.routes');
const post = require('./post.routes');
const like = require('./like.routes');

rootRouter.use('/auth', auth);
rootRouter.use('/posts', post);
rootRouter.use('/likes', like);

module.exports = rootRouter;
