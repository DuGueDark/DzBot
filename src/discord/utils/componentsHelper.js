import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

/**
 * Cria um botão personalizado.
 * @param {string} label - O texto do botão.
 * @param {string} customId - O ID personalizado do botão.
 * @param {ButtonStyle} style - O estilo do botão (pode ser ButtonStyle.Primary, ButtonStyle.Secondary, etc.).
 * @returns {ButtonBuilder} - O botão criado.
 */
export const createButton = (label, customId, style = ButtonStyle.Primary) => {
  return new ButtonBuilder()
    .setLabel(label)
    .setCustomId(customId)
    .setStyle(style);
};

/**
 * Envia uma mensagem com múltiplos botões.
 * @param {Message} channel - O canal onde a mensagem será enviada.
 * @param {string} content - O conteúdo da mensagem.
 * @param {Array<ButtonBuilder>} buttons - Um array de botões a serem adicionados à mensagem.
 */
export const sendMessageWithButtons = async (channel, content, buttons) => {
  const row = new ActionRowBuilder().addComponents(buttons);

  await channel.send({
    content: content,
    components: [row],
  });
};

export const createEmbed = (title, description, color = '#00FF00') => {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp();
};