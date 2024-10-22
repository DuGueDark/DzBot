import fs from 'fs'
import path from 'path'
import Discord from 'discord.js'
import { fileURLToPath } from 'url'

import register from '../handler/slashSync.js'

import 'colors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function commandsHandler(client) {
  



  const interaction_register_arr = []
  const message_register_arr = []

  const baseDirCommandInteraction = path.join(__dirname, '..', 'commands/slash/');
  const baseDirCommandMessage = path.join(__dirname, '..', 'commands/message/');

fs.readdirSync(baseDirCommandInteraction).forEach((subfolder) => {
  const subfolderPath = path.join(baseDirCommandInteraction, subfolder);
  
  if (!fs.lstatSync(subfolderPath).isDirectory()) return;
  
  fs.readdirSync(subfolderPath).forEach(async (file) => {
    if (!file.endsWith(".js")) return;
    
    try {
      const filePath = path.join(subfolderPath, file);
      
      const props = await import(filePath);
      const commandName = file.split(".")[0];
      
      if (!props.default || typeof props.default !== 'object' || !props.default.run) {
        console.warn(`O arquivo ${file} no subfolder ${subfolder} não exporta as propriedades esperadas.`);
        return;
      }
      
      
      client.interactions.set(commandName, {
        name: commandName,
        ...props.default
      });
      
      interaction_register_arr.push(props.default);
      
    } catch (err) {
      console.error(`Erro ao carregar o comando ${file} no subfolder ${subfolder}:`, err);
    }
  });
});
fs.readdirSync(baseDirCommandMessage).forEach((subfolder) => {
  const subfolderPath = path.join(baseDirCommandMessage, subfolder);
  
  if (!fs.lstatSync(subfolderPath).isDirectory()) return;
  
  fs.readdirSync(subfolderPath).forEach(async (file) => {
    if (!file.endsWith(".js")) return;
    
    try {
      const filePath = path.join(subfolderPath, file);
      
      const props = await import(filePath);
      const commandName = file.split(".")[0];
      
      if (!props.default || typeof props.default !== 'object' || !props.default.run) {
        console.warn(`O arquivo ${file} no subfolder ${subfolder} não exporta as propriedades esperadas.`);
        return;
      }
      
      client.messages.set(commandName, {
        name: commandName,
        ...props.default
      });
      
      message_register_arr.push(props.default);
      
    } catch (err) {
      console.error(`Erro ao carregar o comando ${file} no subfolder ${subfolder}:`, err);
    }
  });
});
  // Evento de 'ready' para registrar comandos de Slash
  client.on('ready', async () => {
    console.log(`${client.user.tag} está pronto!`.green);

    try {
      // Verificar se há comandos de interação para registrar
      if (interaction_register_arr.length > 0) {
        await register(
          client,
          interaction_register_arr.map((command) => ({
            name: command.name,
            description: command.description,
            options: command.options || [],
            type: Discord.ApplicationCommandType.ChatInput,
          })),
          { debug: true }
        );
        console.log(`[ /・Slash Command ] - ✅ Todos os comandos de Slash foram carregados!`);
      } else {
        console.warn('⚠️ Nenhum comando de Slash encontrado para registrar.');
      }
    } catch (error) {
      console.error('❌ Erro ao registrar os comandos de Slash:', error);
    }
  });
}
