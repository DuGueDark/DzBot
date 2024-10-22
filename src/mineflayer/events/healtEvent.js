export default {
    name: 'health',
    once: false,
    execute(health, bot) {
        console.log(`Saúde do bot mudou para: ${health}`);
    }
};