const Action = require('./Action');
const DMChannel = require('../../structures/DMChannel');

class ChannelDeleteAction extends Action {
  constructor(client) {
    super(client);
    this.deleted = new Map();
  }

  handle(data) {
    const client = this.client;

    let channel = client.channels.get(data.id);
    if (channel) {
      client.dataManager.killChannel(channel);
      this.deleted.set(channel.id, channel);
      this.scheduleForDeletion(channel.id);
    } else {
      channel = this.deleted.get(data.id) || null;
    }
    if (channel) {
      if (channel.messages && !(channel instanceof DMChannel)) {
        for (const message of channel.messages.values()) {
          message.deleted = true;
        }
      }
      channel.deleted = true;
    }

    return { channel };
  }

  scheduleForDeletion(id) {
    this.client.setTimeout(() => this.deleted.delete(id), this.client.options.restWsBridgeTimeout);
  }
}

module.exports = ChannelDeleteAction;
