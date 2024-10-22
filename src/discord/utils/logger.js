import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, '../logs/bot.log');

export const log = (message, level = 'info') => {
  const levels = {
    info: '[INFO]',
    warn: '[WARN]',
    error: '[ERROR]'
  };
  const logMessage = `${new Date().toISOString()} ${levels[level]} ${message}\n`;

  // Log no console
  console.log(logMessage);

  // Grava log em arquivo
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) console.error('Error writing to log file:', err);
  });
};
