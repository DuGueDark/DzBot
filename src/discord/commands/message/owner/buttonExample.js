import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export default {
  name: 'button',
  description: 'Send a message with buttons',
  run: async ({ client, message }) => {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('primary')
          .setLabel('Primary')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('danger')
          .setLabel('Danger')
          .setStyle(ButtonStyle.Danger),
      );

    await message.channel.send({
      content: 'Here are some buttons:',
      components: [row]
    });
  }
};
