const config = require('./config');

const app = require('./app');

app.listen(config.port, () => {
  console.log('Server is live on port ' + config.port);
});
