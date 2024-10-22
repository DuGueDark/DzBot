import { saveSuggestion } from '../../../database/suggestion.js';

export default {
  name: 'suggest',
  description: 'Submit a suggestion for the bot/server',
  run: async ({ client, message, args }) => {
    const suggestion = args.join(' ');
    if (!suggestion) return message.reply('Please provide a suggestion.');

    try {
      await saveSuggestion(message.author.id, suggestion);
      message.channel.send('Thank you for your suggestion!');
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while saving your suggestion.');
    }
  }
};
