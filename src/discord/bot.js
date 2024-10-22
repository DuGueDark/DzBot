import { DiscordBot } from '../../lib/discord/DiscordClient.js';

const bot = new DiscordBot({ token: '' });

bot.connect().then(() => {
  const discordClient = bot.getClient();

  discordClient.on('ready', () => {
    console.log(`Bot logado como ${discordClient.user.tag}`);
  });

  discordClient.on('messageCreate', message => {
    if (message.content === '!ping') {
      message.channel.send('Pong!');
    }
  });

}).catch(console.error);