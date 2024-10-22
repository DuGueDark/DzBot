export default {
  name: 'messageUpdate',
  execute: async (oldMessage, newMessage, client) => {
    if (newMessage.partial) await newMessage.fetch();
  
    console.log(`Message updated: ${oldMessage.content} to ${newMessage.content} by ${newMessage.author.tag}`);
  }
};
