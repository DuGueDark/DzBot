export default {
  name: 'messageDelete', 
  execute: async (message, client) => {
    if (message.partial) await message.fetch();
  
    console.log(`Message deleted: ${message.content} by ${message.author.tag}`);
  },
}
