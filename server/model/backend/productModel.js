import mongoose from "mongoose";

const productSchema= new mongoose.Schema(
    {
        category: { type: String, required: true, trim: true },
        subcategory: { type: String, required: true, trim: true },
        product: { type: String, required: true, trim: true },
        images: { type: [String], required: true }, 
        size: { type: [String], required: true }, 
        org_price: { type: Number, required: true },
        discount: { type: Number, required: true },
        curr_price: { type: Number, required: true },
    },
    {
        timestamps: {
          createdAt: "created",
          updatedAt: "updated",
        },
      }
    )

    const productModel= mongoose.model("producties",productSchema);
    export default productModel;