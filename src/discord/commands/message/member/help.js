export default {
  name: 'help',
  description: 'List all available commands',
  run: async ({ client, message }) => {
    const commands = message.client.commands.map(cmd => cmd.name).join(', ');
    message.channel.send(`Available commands: ${commands}`);
  },
};
