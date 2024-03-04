import mongoose from "mongoose";

const subcategorySheme= new mongoose.Schema(
    {
       category:{type:String, required:true, trim:true},
       subcategory:{type:String , required:true, trim:true},
       is_verified: { type: Boolean, default: true},
    },
    {
        timestamps: {
            createdAt: "created",
            updatedAt: "updated",
          },
    }
);
const subcategoryModel=mongoose.model("subcategories",subcategorySheme);
export default subcategoryModel;