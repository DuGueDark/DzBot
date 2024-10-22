export default {
  name: 'chat',
  once: false,
  execute(username, message, bot) {
    if (username === bot.username) return;
    console.log(`${username}: ${message}`);
    if (message === 'ping') {
      bot.chat('Pong!');
    }
  }
};