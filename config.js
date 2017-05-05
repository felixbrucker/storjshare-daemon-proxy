module.exports = {
  basicAuth: {
    users: {
      'admin': 'secret',
    },
    unauthorizedResponse: "Unauthorized",
  },
  proxy: {
    hostname: 'localhost',
    port: 8080,
  },
  storjshareDaemon: {
    hostname: 'localhost',
    port: 45015,
  },
};