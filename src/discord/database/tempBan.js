import { getCollection } from './database.js';

export const banUserTemporarily = async (guildId, userId, duration) => {
  const collection = getCollection('tempBans');
  await collection.insertOne({
    guildId,
    userId,
    duration,
    bannedAt: new Date(),
    expiresAt: new Date(Date.now() + duration * 60 * 1000)
  });
};

export const liftBan = async (guildId, userId) => {
  const collection = getCollection('tempBans');
  await collection.deleteOne({ guildId, userId });
};
