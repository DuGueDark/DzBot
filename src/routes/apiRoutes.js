import express from 'express';
import { MinecraftBot } from '../../lib/mineflayer/MineflayerClient.js';
import { DiscordBot } from '../../lib/discord/DiscordClient.js'

const router = express.Router();

router.post('/mineflayer', (req, res) => {
   console.log('Mineflayer')
    try {
        const bot = DiscordBot.connect();
        res.status(200).json({ message: 'Bot do Mineflayer iniciado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao iniciar o bot do Mineflayer', error });
    }
});

export default router;