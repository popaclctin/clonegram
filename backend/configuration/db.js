const mongoose = require('mongoose');
const { dbUrl } = require('./config');

module.exports.mongoose = mongoose;
module.exports.connect = connect;
module.exports.disconnect = disconnect;

function connect() {
  mongoose
    .connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
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
