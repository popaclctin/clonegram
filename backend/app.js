const config = require('./config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//parse requests of type application/json
app.use(express.json());

//parse requests of type application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

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
