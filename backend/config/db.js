import mongoose from "mongoose";

const connectDB = async (MONGO_URI) => {
  try {
    console.log('Attempting to connect with URI:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log(`Successfully connected to mongoDB`);
  } catch (error) {
    console.error(`MongoDB Connection ERROR:`, error);
    process.exit(1);
  }
};

export default connectDB;
