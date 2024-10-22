import { handleError } from '../utils/errorHandler.js';

export default {
  name: 'error',
  execute: async (error, client) => {
    console.error('An error occurred:', error);
   handleError(error); // Log de erro ou notificação
  }
}
