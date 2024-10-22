import { getFeedbackList } from '../../../database/feedback.js';

export default {
  name: 'feedbackList',
  description: 'List all feedback submitted by users',
  run: async ({ client, message }) => {
    const feedbackList = await getFeedbackList();

    if (feedbackList.length === 0) {
      return message.channel.send('No feedback submitted yet.');
    }

    const feedbackMessage = feedbackList.map(feedback => `- ${feedback.userId}: ${feedback.content}`).join('\n');
    message.channel.send(`**Feedbacks:**\n${feedbackMessage}`);
  }
};
