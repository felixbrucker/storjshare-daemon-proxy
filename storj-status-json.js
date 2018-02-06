const commander = require('commander');
const dnode = require('dnode');

commander
  .description('returnes the storj status for a given host and port as JSON')
  .option('--host <hostname>')
  .option('--port <port>')
  .parse(process.argv);

let sock = dnode.connect(commander.host, commander.port);

sock.on('error', () => {
  sock = null;
  console.log(JSON.stringify({result: false, error: 'failed to connect to storjshare-daemon', data: null}));
});

sock.on('remote', (remote) => {
  remote.status((err, result) => {
    sock.end();
    sock = null;
    if (err) {
      console.log(JSON.stringify({result: false, error: err.toString(), data: null}));
      return;
    }
    console.log(JSON.stringify({result:true, error: null, data: result}));
  });
});
