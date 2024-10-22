export default {
    name: 'whisper',
    once: false,
    execute(username, message, bot) {
        console.log(`Sussurro de ${username}: ${message}`);
    }
};