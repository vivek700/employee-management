import { connect } from "mongoose";

const connectDb = async function (url) {
  try {
    if (!url) {
      throw new Error("MONGO_URI environment variable is not set.");
    }
    await connect(url);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

export default connectDb;
