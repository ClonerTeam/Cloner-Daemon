console.info('\x1b[36m%s\x1b[0m', 'Chargement de la configuration..');
var config = require('../utils/config');
var express = require('express');
var bodyParser  = require('body-parser');
var auth = require('../utils/auth.js');
var cloner = require('../utils/cloner.js');
var fs = require('fs');
var app = express();

console.info('\x1b[36m%s\x1b[0m', 'Initialisation du WebSocket sur le port '+config.webport+'..');

var http = require('https');
var options = {
  key: fs.readFileSync(config.sslkey),
  cert: fs.readFileSync(config.sslcertificate)
};

var socket = http.createServer(options, app).listen(config.webport);

var io = require('socket.io')(socket);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

var userNeedToWait = [];

async function addUserNeedToWait(user) {
  userNeedToWait.push(user);
}

async function removeUserNeedToWait(user) {
  var index = userNeedToWait.indexOf(user);
  if(index > -1) {
    userNeedToWait.splice(index, 1);
  }
}

async function userIsOnListToWait(user) {
  return userNeedToWait.includes(user);
}

app.get('/', function (req, res, next){
  res.redirect(config.url);
});

io.sockets.on('connection', async function(s) {
  var socket = s;

  socket.on('auth', async function(token_id, token_key) {
    auth_response = await auth.check(token_id, token_key);

    if(auth_response == true) {

      if(await userIsOnListToWait(token_key)) {
        socket.emit('auth', 'needToWait')
      } else {
        socket.emit('auth', 'success')
      }

      socket.on('stepOne', async (invite) => {

        if(!invite) return socket.emit('newError', "Please specify an invitation !");
        invite = invite.toString().replace(/https:\/\/|http:\/\/|discord\.gg\/|discord\.com\//gi, '');
	//console.log(invite.toString.replace(/discord(?:(?:app)?\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/i, '');

        var stepOne = await cloner.stepOne(invite, token_key);
        if(stepOne[0] == false) return socket.emit('newError', stepOne[1]);

        await addUserNeedToWait(token_key);

        setTimeout(async function() {
          await removeUserNeedToWait(token_key);
        }, 600000);

        socket.emit('stepTwo', stepOne[2]);
      });

    } else {
      socket.emit('auth', 'retry')
    }
  });
})

module.exports = socket;
