const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');
const rootRouter = require('./routes/root.routes');
const errorHandlerMiddleware = require('./middlewares/errorHandler');
const validationErrorHandlerMiddleware = require('./middlewares/validationErrorHandler');

const app = express();

app.use(morgan('dev'));

const corsOptions = {
  origin: `http://localhost:${config.port}`,
};
app.use(cors(corsOptions));
//parse requests of type application/json
app.use(express.json());
//parse requests of type application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.resolve(__dirname, './public')));
app.use('/', rootRouter);
app.use(validationErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

mongoose
  .connect(config.dbHost)
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

app.listen(config.port, () => {
  console.log('Server is live on port ' + config.port);
});
