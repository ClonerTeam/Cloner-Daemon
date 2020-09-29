var Discord = require('discord.js');
var webhookUrl = require('../config.js').webhook;
var webhookClient = new Discord.WebhookClient(webhookUrl.id, webhookUrl.token);

class WebHook {

  static Error(error) {
    try {
      var embed = new Discord.RichEmbed()
      .setAuthor('⚠️ Error ! ⚠️')
      .setColor('#642BF7')
      .setDescription(error);

      webhookClient.send(embed);
    } catch (e) {
      console.log(e);
    }
  }

}

module.exports = WebHook;