var conf_file = require('../../config.json');
var conf = JSON.parse((JSON.stringify(conf_file)));
var config = {};

config.use_ssl = conf.use_ssl;
config.sslcertificate = conf.websocket.ssl.certificate;
config.sslkey = conf.websocket.ssl.key;

config.webport = conf.websocket.listen;
config.daemon_key = conf.panel.key;
config.url = conf.panel.url;

config.webhook = {};
config.webhook.id = conf.webhook.id;
config.webhook.token = conf.webhook.token;


module.exports = config;