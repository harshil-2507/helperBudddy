
import mongoose from 'mongoose';//(ODM) object datamodelling library that lets you interracts with mongodb using javascript objects
// With it, you can define schemas, validate data, and run database operations easily.

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);//causes terminating the app immediately during startup in a production environment if DB connection fails.
  }
};

export default connectDB;