import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const eventsHandler = async (bot) => {
  const eventsPath = path.join(__dirname, '..', 'events');
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    try {
      const event = await import(filePath);
      if (!event.default || !event.default.name || !event.default.execute) {
        console.warn(`O arquivo ${file} não está exportando corretamente o evento.`);
        continue;
      }
      // Aqui você registra o evento com a instância do bot
      if (event.default.once) {
        bot.once(event.default.name, (...args) => event.default.execute(...args, bot));
      } else {
        bot.on(event.default.name, (...args) => event.default.execute(...args, bot));
      }
    } catch (err) {
      console.error(`Erro ao carregar o evento no arquivo ${file}:`, err);
    }
  }
}