export default {
    name: 'timeout',
    once: true,
    execute(bot) {
        console.log('Bot perdeu a conexão com o servidor.');
    }
};