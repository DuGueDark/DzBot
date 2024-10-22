import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const componentsHandler = async (client) => {
  const componentsPath = path.join(__dirname, '..', 'actions');
  const componentFiles = fs.readdirSync(componentsPath).filter(file => file.endsWith('.js'));

  for (const file of componentFiles) {
    const component = await import(`../actions/${file}`);
    
    // Itera sobre todas as exportações de cada arquivo
    for (const customName in component) {
      const button = component[customName];
      // Verifica se o botão tem a propriedade 'customId'
      if (button?.customId) {
        client.buttons.set(button.customId, button);
      }
    }
  }
};