import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {  
    role:{type: String, required: true, trim: true},
    permission:{type: String, required: true, trim: true},
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    mobile:{ type: Number, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    is_verified: { type: Boolean, default: false },
  },
  
  
  {
    timestamps: {
      createdAt: "created",
      updatedAt: "updated",
    },
  }
  

);

const userroleModel = mongoose.model("adminuser", userSchema);
export default userroleModel;
