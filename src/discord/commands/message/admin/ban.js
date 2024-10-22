import { permissions } from '../../../config/permissions.js';
import { checkPermissions } from '../../../utils/permissionsCheck.js';

export default {
  name: 'ban',
  description: 'Ban a user from the server',
  run: async ({ client, message, args }) => {
    const target = message.mentions.users.first();
    if (!target) return message.reply('Please mention a user to ban.');

    if (!checkPermissions(message.member, permissions.admin)) {
      return message.reply('You do not have permission to ban members.');
    }

    try {
      const member = message.guild.members.cache.get(target.id);
      await member.ban();
      message.channel.send(`${target.tag} has been banned.`);
    } catch (error) {
      console.error(error);
      message.channel.send('There was an error banning that member.');
    }
  }
};
