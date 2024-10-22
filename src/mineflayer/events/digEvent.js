export default {
    name: 'dig',
    once: false,
    execute(block, bot) {
        console.log(`Bot terminou de minerar: ${block}`);
    }
};