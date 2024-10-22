export default {
    name: 'kicked',
    once: true,
    execute(reason, bot) {
        console.log(`Bot foi expulso do servidor: ${reason}`);
    }
};