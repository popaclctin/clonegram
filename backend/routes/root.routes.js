const express = require('express');
const rootRouter = express.Router();
const auth = require('./auth.routes');
const post = require('./post.routes');
const like = require('./like.routes');

rootRouter.use('/auth', auth);
rootRouter.use('/post', post);
rootRouter.use('/like', like);

module.exports = rootRouter;
