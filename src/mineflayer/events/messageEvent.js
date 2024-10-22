export default {
    name: 'message',
    once: false,
    execute(message, bot) {
        console.log('Mensagem recebida do servidor:', message.toString());
    }
};