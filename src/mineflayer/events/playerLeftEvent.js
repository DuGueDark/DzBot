export default {
    name: 'playerLeft',
    once: false,
    execute(player, bot) {
        console.log(`${player.username} saiu do jogo.`);
    }
};