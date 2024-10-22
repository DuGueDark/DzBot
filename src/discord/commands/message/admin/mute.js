export default {
  name: 'mute',
  description: 'Mute a user for a specific duration',
  run: async ({ client, message, args }) => {
    const target = message.mentions.members.first();
    const duration = parseInt(args[1]);

    if (!target || isNaN(duration)) {
      return message.reply('Please mention a valid user and specify the duration in minutes.');
    }

    try {
      const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
      if (!muteRole) {
        return message.reply('Mute role not found. Please create one.');
      }

      await target.roles.add(muteRole);
      message.channel.send(`${target.user.tag} has been muted for ${duration} minutes.`);

      setTimeout(async () => {
        await target.roles.remove(muteRole);
        message.channel.send(`${target.user.tag} has been unmuted.`);
      }, duration * 60 * 1000);
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while muting the user.');
    }
  }
};
