const config = require('./configuration/config');
const db = require('./configuration/db');

const app = require('./app');

db.connect();

app.listen(config.port, () => {
  console.log('Server is live on port ' + config.port);
});
