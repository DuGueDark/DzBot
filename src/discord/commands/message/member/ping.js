export default {
  name: 'ping',
  dm: true,
  description: 'Ping the bot',
  run: async ({ client, message, args }) => {
    message.channel.send('Pong!');
  },
};
