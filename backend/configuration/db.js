const mongoose = require('mongoose');
const config = require('./config');

module.exports.mongoose = mongoose;
module.exports.connect = connect;
module.exports.disconnect = disconnect;

function connect() {
  mongoose
    .connect(config.dbHost)
    .then(() => {
      console.log('Connected to the database!');
    })
    .catch((err) => {
      console.log('Cannot connect to the database!', err);
      process.exit();
    });
}

function disconnect() {
  mongoose.disconnect();
}
