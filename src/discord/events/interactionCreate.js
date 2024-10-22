import Discord from 'discord.js'
import fs from 'fs'
import path from 'path'

export default {
  name: Discord.Events.InteractionCreate,
  execute: async (interaction, client) => {
    
    if (interaction.isButton()) {
      
      const component = client.buttons.get(interaction.customId)
      if (component) {
        try {
          await component.execute({ client, interaction })
        } catch (error) {
          console.error('Erro ao executar o botão:', error);
          await interaction.reply({ content: 'Houve um erro ao processar o botão.', ephemeral: true });
        }
      }
      
    }
      
    if (interaction.type === Discord.InteractionType.ApplicationCommand) {
      const command = client.interactions.get(interaction.commandName);
      if (!command) {
        return interaction.reply({
          content: 'Algo deu errado・Talvez o comando não esteja registrado?',
          ephemeral: true
        });
      }

      const { cooldowns } = client;
      if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
      }

      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const defaultCooldownDuration = 3; // em segundos
      const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

      if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
        if (now < expirationTime) {
          const expiredTimestamp = Math.round(expirationTime / 1000);
          return interaction.reply({
            content: `Aguarde, você está em espera por \`${command.name}\`. Você pode usá-lo novamente <t:${expiredTimestamp}:R>.`,
            ephemeral: true
          });
        }
      }

      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

      try {
        await command.run({ client, interaction });
        console.log(`${interaction.user.tag} em #${interaction.channel.name} usou a interação: ${interaction.commandName}`);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: 'Ocorreu um erro ao executar este comando!',
          ephemeral: true
        });
      }
    }
  },
};
