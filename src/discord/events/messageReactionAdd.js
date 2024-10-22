export default {
  name: 'messageReactionAdd',
  execute: async (reaction, user, client) => {
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return; // Ignorar reações de bots

    if (reaction.emoji.name === '👍') {
      await reaction.message.reply(`Thanks for the thumbs up, ${user.username}!`);
    }
  }
};
