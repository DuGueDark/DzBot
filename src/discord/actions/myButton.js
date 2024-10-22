export const myButton = {
  customId: 'my_button',
  execute: async ({ client, interaction }) => {
    await interaction.reply('Você clicou no botão!');
  },
};

export const button = {
  customId: 'button',
  execute: async ({ interaction }) => {
    await interaction.reply('Você clicou no botão!');
  },
};