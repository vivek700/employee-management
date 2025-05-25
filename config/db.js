import { connect } from "mongoose";

const url = "mongodb://mongo:27017/docker-node-mongo";

const connectDb = async function () {
  try {
    await connect(url);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

export default connectDb;
