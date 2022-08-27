const config = require('./config');
const mongoose = require('mongoose');

const app = require('./app');

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
