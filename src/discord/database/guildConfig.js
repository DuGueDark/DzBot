import { getCollection } from './database.js';

export const setGuildPrefix = async (guildId, prefix) => {
  const collection = getCollection('guildConfigs');
  await collection.updateOne({ guildId }, { $set: { prefix } }, { upsert: true });
};

export const getGuildPrefix = async (guildId) => {
  const collection = getCollection('guildConfigs');
  const config = await collection.findOne({ guildId });
  return config ? config.prefix : '!';
};
