var fetch = require('node-fetch');
var proxies = require('../proxies');
var HttpsProxyAgent = require('https-proxy-agent');

class Guild {

  static async Info(invite){
    return new Promise(async (resolve) => {
      var response = await fetch(`https://discord.com/api/v7/invite/${invite}`, {
        method: 'GET'
      });

      if(response.status === 429)
        return resolve([ false ]);

      var responseDecoded = await response.json();

      return resolve([ true, responseDecoded ]);
    });
  }

  static async Join(invite, token) {
    return new Promise(async (resolve) => {
      var response = await fetch(`https://discord.com/api/v7/invite/${invite}`, {
        method: 'POST',
        headers: {
          authorization: token,
        }
      });

      if(response.status === 429)
        return resolve([ false, 1 ]);

      var responseDecoded = await response.json();

      if(responseDecoded.message === "401: Unauthorized")
        return resolve([ false, 2 ]);

      return resolve([ true, responseDecoded ]);
    });
  }

}

module.exports = Guild;