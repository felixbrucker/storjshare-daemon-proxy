const dnode = require('dnode');
const config = require('./config');

const methods = [
  'status',
  'start',
  'stop',
  'restart',
];

function executeMethod(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const method = req.params.method;
  if (!method || methods.indexOf(method) === -1) {
    console.log(`invalid method: ${method}`);
    res.send(JSON.stringify({result: false, error: 'invalid method', data: null}));

    return;
  }
  const sock = dnode.connect(config.storjshareDaemon.hostname, config.storjshareDaemon.port);

  sock.on('error', () => {
    console.log('failed to connect to storjshare-daemon');
    res.send(JSON.stringify({result: false, error: 'failed to connect to storjshare-daemon', data: null}));

    return;
  });

  sock.on('remote', (remote) => {
    const resHandler = (err, result) => {
      sock.end();
      if (err) {
        console.log(`query "${method}" returned an error: ${err.toString()}`);
        res.send(JSON.stringify({result: false, error: err.toString(), data: null}));

        return;
      }
      res.send(JSON.stringify({result:true, error: '', data: result}));

      return;
    };
    if (req.body.param) {
      remote[method](req.body.param, resHandler);
    } else {
      remote[method](resHandler);
    }
  });
}

module.exports = {
  executeMethod,
};