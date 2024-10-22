import { getCollection } from './database.js';

export const getUserBalance = async (userId) => {
  const collection = getCollection('economy');
  const user = await collection.findOne({ userId });
  return user ? user.balance : 0;
};

export const addFunds = async (userId, amount) => {
  const collection = getCollection('economy');
  await collection.updateOne(
    { userId },
    { $inc: { balance: amount } },
    { upsert: true }
  );
};

export const subtractFunds = async (userId, amount) => {
  const collection = getCollection('economy');
  await collection.updateOne(
    { userId },
    { $inc: { balance: -amount } },
    { upsert: true }
  );
};
