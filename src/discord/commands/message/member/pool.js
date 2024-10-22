export default {
  name: 'poll',
  description: 'Create a poll',
  run: async ({ client, message, args }) => {
    const question = args.join(' ');

    if (!question) return message.reply('Please provide a question for the poll.');

    const pollMessage = await message.channel.send(`Poll: ${question}`);
    await pollMessage.react('👍');
    await pollMessage.react('👎');
  }
};
