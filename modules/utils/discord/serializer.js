class Serializer {

  static GeneralData(guild) {
    return {
      name: guild.name,
      region: guild.region,
      icon: guild.iconURL,
      afkTimeout: guild.afkTimeout,
      verificationLevel: guild.verificationLevel,
      explicitContentFilter: guild.explicitContentFilter
    }
  }

  static Roles(guild) {
    let roles = guild.roles.sort((a,b) => b.position - a.position).map((role) => {
      return {
        idOld: role.id,
        name: role.name,
        hexColor: role.hexColor,
        hoist: role.hoist,
        mentionable: role.mentionable,
        position: role.position,
        defaultRole: guild.defaultRole.id === role.id,
        permBitfield: role.permissions,
      };
    });

    return roles;
  }

  static Categories(guild) {
    let categoryCollection = guild.channels.filter(c => c.type === 'category');
      categoryCollection = categoryCollection.sort((a, b) => a.position - b.position);
    let categories = categoryCollection.map(category => {
      let permOverwritesCollection = category.permissionOverwrites.filter(pOver => pOver.type === 'role');
      let permOverwrites = permOverwritesCollection.map(pOver => {
        return {
          id: pOver.id,
          allowed: pOver.allowed.bitfield,
          denied: pOver.denied.bitfield,
        };
      });

      return {
        idOld: category.id,
        name: category.name,
        position: category.position,
        permOverwrites: permOverwrites,
      };
    });

    return categories;
  }

  static textChannels(guild) {
    let textChannelCollection = guild.channels.filter(c => c.type === 'text');
      textChannelCollection = textChannelCollection.sort((a, b) => a.rawPosition - b.rawPosition);
    let textChannel = textChannelCollection.map(tCh => {
      let permOverwritesCollection = tCh.permissionOverwrites.filter(pOver => pOver.type === 'role');
      let permOverwrites = permOverwritesCollection.map(pOver => {
          return {
            id: pOver.id,
            allowed: pOver.allowed.bitfield,
            denied: pOver.denied.bitfield,
          };
      });

      return {
        id: tCh.id,
        name: tCh.name,
        topic: tCh.topic,
        nsfw: tCh.nsfw,
        isSystemChannel: guild.systemChannelID === tCh.id,
        position: tCh.position,
        parentCat: tCh.parentID,
        permLocked: tCh.permissionsLocked ? tCh.permissionsLocked : false,
        permOverwrites: tCh.permissionsLocked ? null : permOverwrites,
      };
    });
    return textChannel;
  }

  static voiceChannels(guild) {
    let voiceChannelCollection = guild.channels.filter(c => c.type === 'voice');
    voiceChannelCollection = voiceChannelCollection.sort((a, b) => a.rawPosition - b.rawPosition);
    let voiceChannel = voiceChannelCollection.map(vCh => {
        let permOverwritesCollection = vCh.permissionOverwrites.filter(pOver => pOver.type === 'role');
        let permOverwrites = permOverwritesCollection.map(pOver => {
            return {
                id: pOver.id,
                allowed: pOver.allowed.bitfield,
                denied: pOver.denied.bitfield,
            };
        });

        return {
            id: vCh.id,
            name: vCh.name,
            position: vCh.position,
            parentCat: vCh.parentID,
            bitrate: vCh.bitrate,
            userLimit: vCh.userLimit,
            isAfkChannel: guild.afkChannelID === vCh.id,
            permLocked: vCh.permissionsLocked ? vCh.permissionsLocked : false,
            permOverwrites: vCh.permissionsLocked ? null : permOverwrites,
        };
    });

    return voiceChannel;
  }

  static Emojis(guild) {
    return guild.emojis.map(emoji => {
      return {
        name: emoji.name,
        url: emoji.url,
        animated: emoji.animated
      }
    })
  }
}

module.exports = Serializer;