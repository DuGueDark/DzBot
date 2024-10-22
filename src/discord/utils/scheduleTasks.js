import cron from 'node-cron';
import { log } from './logger.js';

// Exemplo de agendamento diário
export const scheduleDailyTask = () => {
  cron.schedule('0 0 * * *', () => {
    log('Running daily task at midnight');
    // Insira sua lógica diária aqui (por exemplo, limpar logs, verificar banco de dados, etc.)
  });
};
