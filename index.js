console.info('\x1b[36m%s\x1b[0m', '+--------------------------------+');
console.info('\x1b[36m%s\x1b[0m', '|                                |');
console.info('\x1b[36m%s\x1b[0m', '|      Cloner Daemon 0.0.1       |');
console.info('\x1b[36m%s\x1b[0m', '|     Developpé par Niroxy.      |');
console.info('\x1b[36m%s\x1b[0m', '|                                |');
console.info('\x1b[36m%s\x1b[0m', '+--------------------------------+');

setTimeout(function() {
  require('./modules/http/socket.js');
}, 500);

process.on('uncaughtException', function (err) {
  console.error(err);
});