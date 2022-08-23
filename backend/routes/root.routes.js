const express = require('express');
const rootRouter = express.Router();
const auth = require('./auth.routes');

rootRouter.use('/auth', auth);

module.exports = rootRouter;
