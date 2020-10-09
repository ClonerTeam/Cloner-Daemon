var request = require('request');
var config = require('../utils/config.js');

async function check(token_id, token_key, permissions) {
  return new Promise(resolve => {
    request.post({
        url:     config.url + "api/auth",
        form:    { daemon_key: config.daemon_key, token_id: token_id, token_key: token_key }
    }, function(error, response, body){
        if (body == "true" || body == "1") {
            var reponse = true;
            resolve(reponse);
        } else {
            var reponse = false;
            resolve(reponse);
        }
    })
  })
}

module.exports.check = check;