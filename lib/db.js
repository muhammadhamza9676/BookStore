import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

let isConnected;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  if (!MONGO_URI) {
    throw new Error("MongoDB connection string (MONGO_URI) is not defined in .env");
  }

  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};
