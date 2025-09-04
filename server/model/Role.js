import mongoose from "mongoose";
import { ROLE_NAMES } from "../utils/constanse.js";

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      enum: Object.values(ROLE_NAMES), // ✅ only allowed roles
      required: true,
    },
  },
  { timestamps: true, collection: "tbl_roles" }
);

export default mongoose.model("Role", RoleSchema);
