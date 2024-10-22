import { MongoClient } from 'mongodb';
const uri = 'mongodb+srv://duguedark:<db_password>@users.qv9rb.mongodb.net/?retryWrites=true&w=majority&appName=Users';
const client = new MongoClient(uri);

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log('Connected to database');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

export const getCollection = (collectionName) => {
  return client.db('your-database').collection(collectionName);
};
