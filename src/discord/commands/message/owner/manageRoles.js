export default {
  name: 'manageRoles',
  description: 'Add or remove roles from a user',
  run: async ({ client, message, args }) => {
    const action = args[0]; // add/remove
    const roleName = args[1];
    const user = message.mentions.members.first();

    if (!action || !roleName || !user) {
      return message.reply('Usage: !manageRoles <add/remove> <roleName> @User');
    }

    const role = message.guild.roles.cache.find(r => r.name === roleName);

    if (!role) {
      return message.reply('Role not found.');
    }

    try {
      if (action === 'add') {
        await user.roles.add(role);
        message.channel.send(`Role ${roleName} added to ${user.displayName}`);
      } else if (action === 'remove') {
        await user.roles.remove(role);
        message.channel.send(`Role ${roleName} removed from ${user.displayName}`);
      } else {
        message.reply('Invalid action. Use "add" or "remove".');
      }
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while managing roles.');
    }
  }
};
