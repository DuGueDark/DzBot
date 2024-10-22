import Discord from 'discord.js'

export default {
  name: 'ping',
  description: 'Ping the bot',
  type: Discord.ApplicationCommandType.ChatInput,
  run: async ({ client, interaction }) => {
    interaction.reply('Pong!');
    sendMessageWithButtons(interaction.channel, 'Kkkkkkk', createButton('Ok', 'button', 2, ))
    
    
  },
};
