export default {
  name: 'clear',
  description: 'Clear a specified number of messages from the current channel',
  run: async ({ client, message, args }) => {
    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply('Please specify a valid number of messages to delete.');
    }

    try {
      const messages = await message.channel.bulkDelete(amount, true);
      message.channel.send(`Deleted ${messages.size} messages.`).then(msg => msg.delete({ timeout: 5000 }));
    } catch (error) {
      console.error(error);
      message.channel.send('There was an error trying to delete messages in this channel.');
    }
  }
};
