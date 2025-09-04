import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    user_name: { type: String, default: null },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    mobile: { type: String, unique: true, default: null },
    password: { type: String, default: null },
    login_from: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
    role_id: { type: mongoose.Schema.Types.ObjectId, ref: "Role", default: null },
    profile_picture: { type: String, default: null },
    profile_complete: {
      type: String,
      enum: ["PENDING", "COMPLETE"],
      default: "PENDING",
    },
    fcm_token: { type: String, default: null },
  },
  { timestamps: true, collection: "tbl_users" }
);

export default mongoose.model("User", UserSchema);
