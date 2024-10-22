import fetch from 'node-fetch';

export const sendWebhookMessage = async (message) => {
  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message })
  });

  if (!response.ok) {
    throw new Error(`Webhook response error: ${response.statusText}`);
  }
};
