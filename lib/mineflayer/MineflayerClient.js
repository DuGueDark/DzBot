import mineflayer from 'mineflayer';

export class MinecraftBot {
  constructor() {
    this.bot = null;
  }

  async createBot(username, host, port, version) {
    this.bot = await mineflayer.createBot({
      username,
      host,
      port,
      version,
    });
    
    return this.bot;
  }

  getBot() {
    return this.bot;
  }
}
