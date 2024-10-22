import { banUserTemporarily, liftBan } from '../../../database/tempBan.js';

export default {
  name: 'tempban',
  description: 'Temporarily ban a user for a specified duration',
  run: async ({ client, message, args }) => {
    const target = message.mentions.users.first();
    const duration = parseInt(args[1]); // Em minutos

    if (!target || isNaN(duration)) {
      return message.reply('Please mention a valid user and specify the duration in minutes.');
    }

    try {
      await banUserTemporarily(message.guild.id, target.id, duration);
      await message.guild.members.ban(target.id);
      message.channel.send(`${target.tag} has been banned for ${duration} minutes.`);

      // Desbanir após o tempo especificado
      setTimeout(async () => {
        await liftBan(message.guild.id, target.id);
        await message.guild.members.unban(target.id);
        message.channel.send(`${target.tag} has been unbanned.`);
      }, duration * 60 * 1000);
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while banning the user.');
    }
  }
};
