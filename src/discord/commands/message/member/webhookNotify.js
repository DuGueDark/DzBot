import { WEBHOOK_URL } from '../../../config/webhook.js';
import { sendWebhookMessage } from '../../../utils/webhookHelper.js';

export default {
  name: 'notify',
  description: 'Send a notification to the configured webhook',
  run: async ({ client, message, args }) => {
    const notificationMessage = args.join(' ');
    if (!notificationMessage) return message.reply('Please provide a message to send to the webhook.');

    try {
      await sendWebhookMessage(notificationMessage);
      message.channel.send('Notification sent to the webhook!');
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while sending the notification.');
    }
  }
};
