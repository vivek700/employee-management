import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    id: {
      type: String,
      required: true,
      unique: true,
    },
    isAnonymous: Boolean,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
