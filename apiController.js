const dnode = require('dnode');
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
  let sock = dnode.connect(config.storjshareDaemon.hostname, config.storjshareDaemon.port);

  sock.on('error', () => {
    sock = null;
    console.log('failed to connect to storjshare-daemon');
    res.send(JSON.stringify({result: false, error: 'failed to connect to storjshare-daemon', data: null}));
  });

  sock.on('remote', (remote) => {
    const resHandler = (err, result) => {
      sock.end();
      sock = null;
      if (err) {
        console.log(`query "${method}" returned an error: ${err.toString()}`);
        res.send(JSON.stringify({result: false, error: err.toString(), data: null}));

        return;
      }
      res.send(JSON.stringify({result:true, error: '', data: result}));
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
