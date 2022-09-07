const express = require('express');
const rootRouter = express.Router();
const auth = require('./auth.routes');
const post = require('./post.routes');
const like = require('./like.routes');
const search = require('./search.routes');
const feed = require('./feed.routes');
const user = require('./user.routes');
const comment = require('./comment.routes');

rootRouter.use('/auth', auth);
rootRouter.use('/posts', post);
rootRouter.use('/likes', like);
rootRouter.use('/search', search);
rootRouter.use('/feed', feed);
rootRouter.use('/user', user);
rootRouter.use('/comments', comment);

module.exports = rootRouter;
