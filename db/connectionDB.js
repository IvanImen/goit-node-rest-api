import "dotenv/config";
import mongoose from "mongoose";

const { DB_URI } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connection successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
