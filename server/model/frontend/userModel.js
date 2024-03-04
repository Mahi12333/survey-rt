import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    image:{type:String, default:null},
    is_verified: { type: Boolean, default: true },

  },
  {
    timestamps: {
      createdAt: "created",
      updatedAt: "updated",
    },
  }
  

);

const userModel = mongoose.model("realuser", userSchema);
export default userModel;
