import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(!process.env.MONGO_URI) return console.log('No MONGO_URI found in .env file');

  if(isConnected) return console.log('Already connected to DB');

  try {
    
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log('Connected to DB');

  } catch (error) {
    console.log('Error connecting to DB', error);
  }
}