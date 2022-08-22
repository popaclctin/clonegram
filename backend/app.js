const config = require('./config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const rootRouter = require('./routes/rootRouter');
const morgan = require('morgan');

app.use(morgan('combined'));

//parse requests of type application/json
app.use(express.json());

//parse requests of type application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/', rootRouter);

mongoose
  .connect(config.dbHost)
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(err, 'Failed to connect to DB');
  });

app.listen(config.port, () => {
  console.log('Server is live on port ' + config.port);
});
