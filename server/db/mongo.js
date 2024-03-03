import mongoose from 'mongoose';

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to Mongodb');
  } catch (error) {
    console.log(error);
  }
};
