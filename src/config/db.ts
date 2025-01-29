import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbConnectionString = process.env.DB_CONNECTION_STRING;
    if (!dbConnectionString) {
      throw new Error("DB_CONNECTION_STRING is not defined");
    }
    await mongoose.connect(dbConnectionString);
    console.log("Db connected successfully");
  } catch (err) {
    console.log("MongoDB connection failed", err);
    process.exit(1);
  }
};

export default connectDB;
