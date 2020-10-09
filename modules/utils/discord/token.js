var request = require('request');
var proxies = require('../proxies');

class Token {
  static async Check(token) {
    return new Promise(async (resolve) => {
      request({
        method: "GET",
        url: "https://discordapp.com/api/v7/users/@me",
        headers: {
          authorization: token
        },
      }, (err, response, body) => {
        if(!body) resolve(false);

        if(response.statusCode === 429)
          resolve(false);

        let json = JSON.parse(body);

        if(!json.id)
          return resolve(false)

        return resolve(true);
      });
    });
  }
}

module.exports = Token;