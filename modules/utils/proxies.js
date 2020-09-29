var request = require('request');

async function getProxies() {
  return new Promise(resolve => {
    request.get({
        url: "http://pubproxy.com/api/proxy",
    }, function(error, response, body){
        if (error) resolve('error');
        
        if(body.indexOf('We have to temporarily stop you.') >=0 ) {
          // Changement d'api
          request.get({
            url: "https://gimmeproxy.com/api/getProxy"
          }, function(error, response, body) {
            if(error) resolve('error');
            
            var response = JSON.parse(body);
            if(response.status_code && response.status_code === 429) {
              // Changement d'api
              request.get({
                url: "https://api.getproxylist.com/proxy"
              }, function(error, response, body) {
                if(error) resolve('error');

                var response = JSON.parse(body);
                if(response.error) {
                  // Changer d'api ou autre
                } else {
                  return resolve(response.ip + ":" + response.port)
                }

              });
            } else {
              return resolve(response.ipPort);
            }

          })
        } else {
          var response = JSON.parse(body);
          return resolve(response.data[0].ipPort);
        }
    })
  })
}

module.exports.getProxies = getProxies;
