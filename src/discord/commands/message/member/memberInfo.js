export default {
  name: 'memberInfo',
  description: 'Get information about a server member',
  run: async ({ client, message, args }) => {
    const member = message.mentions.members.first();
    if (!member) return message.reply('Please mention a member.');

    const info = `
      **Username:** ${member.user.username}
      **ID:** ${member.user.id}
      **Joined Server:** ${member.joinedAt.toDateString()}
      **Roles:** ${member.roles.cache.map(role => role.name).join(', ')}
    `;

    message.channel.send(info);
  }
};
