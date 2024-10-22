export default {
  name: 'info',
  description: 'Get information about the bot',
  run: async ({ client, message }) => {
    message.channel.send('I am a bot created to help you with various tasks. Use !help to see my commands.');
  }
};
