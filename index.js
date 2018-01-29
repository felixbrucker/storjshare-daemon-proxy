const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

const config = require('./config');
const routes = require('./routes');

const app = express();

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.connection.remoteAddress} - "${req.method} ${req.url}"`);
  next();
});

config.basicAuth.challenge = true;
app.use(basicAuth(config.basicAuth));

app.use(bodyParser.json({
  limit: '1mb'
}));

routes(app);

const listener = app.listen(config.proxy.port, config.proxy.hostname, () => {
  console.log(`server running on port ${listener.address().port}`);
});

process.on('uncaughtException', function (err) {
  console.log(err.stack);
});
