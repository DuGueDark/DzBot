import { saveFeedback } from '../../../database/feedback.js';

export default {
  name: 'feedback',
  description: 'Send your feedback about the bot',
  run: async ({ client, message, args }) => {
    const feedbackMessage = args.join(' ');
    if (!feedbackMessage) return message.reply('Please provide your feedback.');

    try {
      await saveFeedback(message.author.id, feedbackMessage);
      message.channel.send('Thank you for your feedback!');
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while saving your feedback.');
    }
  }
};
