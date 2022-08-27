const express = require('express');
const rootRouter = express.Router();
const auth = require('./auth.routes');
const post = require('./post.routes');
const like = require('./like.routes');
const search = require('./search.routes');
const feed = require('./feed.routes');
const user = require('./user.routes');

rootRouter.use('/auth', auth);
rootRouter.use('/post', post);
rootRouter.use('/like', like);
rootRouter.use('/search', search);
rootRouter.use('/feed', feed);
rootRouter.use('/user', user);

module.exports = rootRouter;
