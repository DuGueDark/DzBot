import { setGuildPrefix } from '../../../database/guildConfig.js';

export default {
  name: 'setprefix',
  description: 'Set a custom prefix for this server',
  run: async ({ client, message, args }) => {
    if (!message.member.permissions.has('ADMINISTRATOR')) {
      return message.reply('You do not have permission to set the prefix.');
    }

    const newPrefix = args[0];
    if (!newPrefix) return message.reply('Please provide a new prefix.');

    try {
      await setGuildPrefix(message.guild.id, newPrefix);
      message.channel.send(`Prefix changed to: ${newPrefix}`);
    } catch (error) {
      console.error(error);
      message.channel.send('Failed to set the prefix.');
    }
  }
};
