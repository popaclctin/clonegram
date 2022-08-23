const config = require('./config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const validationErrorHandlerMiddleware = require('./middlewares/validationErrorHandler');

const rootRouter = require('./routes/root.routes');
const express = require('express');
const app = express();

mongoose
  .connect(config.dbHost)
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(err, 'Failed to connect to DB');
  });

app.use(morgan('dev'));

//parse requests of type application/json
app.use(express.json());

//parse requests of type application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/', rootRouter);

app.use(validationErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

app.listen(config.port, () => {
  console.log('Server is live on port ' + config.port);
});
