export default {
    name: 'error',
    once: false,
    execute(err, bot) {
        console.error('Erro:', err);
    }
};