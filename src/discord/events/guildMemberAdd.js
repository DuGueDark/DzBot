export default {
  name: 'guildMemberAdd',
  execute: async (member, client) => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
  if (!welcomeChannel) return;

  welcomeChannel.send(`Welcome to the server, ${member}!`);
  },
}