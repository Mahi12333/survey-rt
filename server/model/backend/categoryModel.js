import mongoose, { Schema } from "mongoose";

const categoryScheme=new mongoose.Schema(
    {
        category: { type: String, required: true, trim: true },
        is_verified: { type: Boolean, default: true},
    },
    {
        timestamps: {
            createdAt: "created",
            updatedAt: "updated",
          },
    }
);

const categoryModel=mongoose.model("category",categoryScheme);
export default categoryModel;
