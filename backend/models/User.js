import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: String,
    email: String,
    name: String,
    tokens: {
      access_token: String,
      refresh_token: String,
      scope: String,
      token_type: String,
      expiry_date: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
