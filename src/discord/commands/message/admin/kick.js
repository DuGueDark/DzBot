import { permissions } from '../../../config/permissions.js';
import { checkPermissions } from '../../../utils/permissionsCheck.js';

export default {
  name: 'kick',
  description: 'Kick a user from the server',
  run: async ({ client, message, args }) => {
    const target = message.mentions.users.first();
    if (!target) return message.reply('Please mention a user to kick.');

    if (!checkPermissions(message.member, permissions.moderator)) {
      return message.reply('You do not have permission to kick members.');
    }

    try {
      const member = message.guild.members.cache.get(target.id);
      await member.kick();
      message.channel.send(`${target.tag} has been kicked.`);
    } catch (error) {
      console.error(error);
      message.channel.send('There was an error kicking that member.');
    }
  }
};
