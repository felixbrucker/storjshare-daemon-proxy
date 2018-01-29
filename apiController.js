const { execSync } = require('child_process');
const config = require('./config');

const methods = [
  'status',
];

function executeMethod(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const method = req.params.method;
  if (!method || methods.indexOf(method) === -1) {
    console.log(`invalid method: ${method}`);
    res.send(JSON.stringify({result: false, error: 'invalid method', data: null}));

    return;
  }
  const stats = JSON.parse(execSync(`storjshare status --json`).toString().trim());

  return res.send(JSON.stringify({result:true, error: '', data: stats}));
}

module.exports = {
  executeMethod,
};
