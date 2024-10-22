export default {
  name: 'react',
  description: 'React to a message with an emoji',
  run: async ({ client, message, args }) => {
    const messageId = args[0];
    const emoji = args[1];

    if (!messageId || !emoji) {
      return message.reply('Usage: !react <messageId> <emoji>');
    }

    try {
      const targetMessage = await message.channel.messages.fetch(messageId);
      await targetMessage.react(emoji);
      message.channel.send(`Reacted to the message with emoji: ${emoji}`);
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while reacting to the message.');
    }
  }
};
