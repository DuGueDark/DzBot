import Discord, { Collection } from 'discord.js';

export class DiscordBot {
  constructor({ token }) {
    this.token = token
    this.client = new Discord.Client({
      intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMembers,
        Discord.IntentsBitField.Flags.GuildInvites,
        Discord.IntentsBitField.Flags.GuildPresences,
        Discord.IntentsBitField.Flags.GuildVoiceStates,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.GuildMessageReactions,
        Discord.IntentsBitField.Flags.GuildEmojisAndStickers,
        Discord.IntentsBitField.Flags.MessageContent,
        Discord.IntentsBitField.Flags.DirectMessages
      ],
      partials: [
        Discord.Partials.User,
        Discord.Partials.Message,
        Discord.Partials.Reaction,
        Discord.Partials.Channel,
        Discord.Partials.GuildMember
      ]
    });

    this.client.interactions = new Collection();
    this.client.messages = new Collection();
    this.client.cooldowns = new Collection();
    this.client.buttons = new Collection();
  }

  async connect() {
    await this.client.login(this.token);
    return this.client;
  }

  getClient() {
    return this.client;
  }
}