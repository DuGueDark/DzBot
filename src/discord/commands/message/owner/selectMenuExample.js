import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';

export default {
  name: 'selectmenu',
  description: 'Send a message with a select menu',
  run: async ({ client, message }) => {
    const row = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select')
          .setPlaceholder('Make a choice...')
          .addOptions([
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
          ]),
      );

    await message.channel.send({
      content: 'Choose an option:',
      components: [row]
    });
  }
};
