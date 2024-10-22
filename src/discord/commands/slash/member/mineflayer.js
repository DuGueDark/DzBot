import Discord from 'discord.js'
import { createBot } from '../../../mineflayer/createBot.js'

export default {
  name: 'mineflayer',
  description: 'Criar bot mineflayer',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "username",
      type: Discord.ApplicationCommandOptionType.String,
      description: "Escreva seu texto em portugês para ser traduzido em inglês.",
       required: false
    }
  ],
  run: async ({ client, interaction }) => {
    
    createBot('kkkk', 28878, 'DzBot').then(response => {
      console.log(response)
    })
    
  },
};
