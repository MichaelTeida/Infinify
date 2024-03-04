import mongoose, { Mongoose } from "mongoose";

// URL to MongoDB database
const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null; // connection
  promise: Promise<Mongoose> | null;
}

// Cache for MongoDB connection
let cached: MongooseConnection = (global as any).mongoose; // (global as any) - Bypasses TypeScript checks

// Initialize cache if it doesn't exist
if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

// Function to establish database connection
export const connectToDatabase = async () => {
  // If connection already exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If database URL is not available, throw an error
  if (!MONGODB_URL) {
    throw new Error("MONGODB_URL not found");
  }

  try {
    // Establishing connection to the database
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URL, {
        dbName: "Infinify",
        bufferCommands: false,
      });

    // Waiting for the connection
    cached.conn = await cached.promise;
  } catch (error) {
    // If connection fails, throw an error
    throw new Error("Failed to connect to MongoDB: " + error);
  }

  // Return the connection
  return cached.conn;
};
