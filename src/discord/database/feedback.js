import { getCollection } from './database.js';

export const saveFeedback = async (userId, content) => {
  const collection = getCollection('feedback');
  await collection.insertOne({ userId, content, createdAt: new Date() });
};

export const getFeedbackList = async () => {
  const collection = getCollection('feedback');
  return await collection.find().toArray();
};
