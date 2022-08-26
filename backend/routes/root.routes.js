const express = require('express');
const rootRouter = express.Router();
const auth = require('./auth.routes');
const post = require('./post.routes');
const like = require('./like.routes');
const search = require('./search.routes');

rootRouter.use('/auth', auth);
rootRouter.use('/post', post);
rootRouter.use('/like', like);
rootRouter.use('/search', search);

module.exports = rootRouter;
