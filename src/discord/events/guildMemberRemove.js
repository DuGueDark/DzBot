export default {
  name: 'guildMemberRemove',
  execute: async (member, client) => {
    console.log(`${member.user.tag} has left the server.`);
  },
}
