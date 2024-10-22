import Discord from 'discord.js'
import { PREFIX } from '../config/config.js'

export default {
	name: Discord.Events.MessageCreate,
	once: false,
	execute: async (message, client) => {
	  if (message.author.bot) return;
	  if (!message.content.toLowerCase().startsWith(PREFIX.toLowerCase())) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;
    const args = message.content
      .trim().slice(PREFIX.length)
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    const command = client.messages.get(cmd);;
    
    if (!command) {
      console.error(`Nenhuma correspondência de comando ${cmd} foi encontrado.`);
      message.reply(`Nenhum comando existente com "${cmd}"`).then(m => {
        setTimeout(() => {
          m.delete()
        }, 5000)
      })
      return
    }
    
    if (message.channel.type === 1) {
      if (!command.dm || command.dm !== true) {
        return message.reply('Não é permitido o uso de comandos na DM');
      }
    }
      
    const { cooldowns } = message.client;

  	if (!cooldowns.has(command.name)) {
		  cooldowns.set(command.name, new Discord.Collection());
  	}

    const now = Date.now();
  	const timestamps = cooldowns.get(command.name);
	  const defaultCooldownDuration = 3;
  	const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

	  if (timestamps.has(message.author.id)) {
		  const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		  if (now < expirationTime) {
		  	const expiredTimestamp = Math.round(expirationTime / 1000);
			  return message.reply({ content: `Aguarde, você está em espera por \`${command.name}\`. Você pode usá-lo novamente <t:${expiredTimestamp}:R>.`, ephemeral: true });
	  	}
  	}
    	
  	timestamps.set(message.author.id, now);
	  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	
    try {
      command.run({ client, message, args });
      if (message.channel.type === 1) {
        console.log(`${message.author.tag} em DM usou o comando: ${command.name}`);
      } else {
        console.log(`${message.author.tag} em #${message.channel.name} usou o comando: ${command.name}`);
      }
    } catch (error) { 
      console.error(error);
    }
     
	}
};