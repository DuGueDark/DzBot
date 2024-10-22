import { getCollection } from './database.js';

export const saveSuggestion = async (userId, suggestion) => {
  const collection = getCollection('suggestions');
  await collection.insertOne({
    userId,
    suggestion,
    createdAt: new Date()
  });
};
