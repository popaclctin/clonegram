const express = require('express');
const rootRouter = express.Router();
const auth = require('./authRouter');

rootRouter.use('/auth', auth);

module.exports = rootRouter;
