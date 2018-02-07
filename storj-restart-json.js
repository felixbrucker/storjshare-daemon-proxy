const commander = require('commander');
const dnode = require('dnode');

commander
  .description('restarts the given share or all')
  .option('--host <hostname>')
  .option('--port <port>')
  .option('--node <nodeid>')
  .parse(process.argv);

if (!commander.node) {
  process.exit(1);
}

let sock = dnode.connect(commander.host, commander.port);

sock.on('error', () => {
  sock = null;
  console.log(JSON.stringify({result: false, error: 'failed to connect to storjshare-daemon'}));
});

sock.on('remote', (remote) => {
  remote.restart((commander.node === 'all' ? '*' : commander.node), (err) => {
    sock.end();
    sock = null;
    if (err) {
      console.log(JSON.stringify({result: false, error: err.toString()}));
      return;
    }
    console.log(JSON.stringify({result:true, error: null}));
  });
});