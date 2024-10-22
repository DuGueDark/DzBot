export default {
    name: 'playerJoined',
    once: false,
    execute(player, bot) {
        console.log(`${player.username} entrou no jogo.`);
    }
};