const { execSync } = require('child_process');
const config = require('./config');

function executeStatus(req, res) {
  res.setHeader('Content-Type', 'application/json');
  // work around dnode mem leak
  res.send(execSync(`node storj-status-json --host ${config.storjshareDaemon.hostname} --port ${config.storjshareDaemon.port}`, {timeout: 60 * 1000}).toString().trim());
}

module.exports = {
  executeStatus,
};
