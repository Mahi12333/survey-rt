import categoryModel from "../../../model/backend/categoryModel.js";
import { categoryValidation } from "../../../validations/category.js";
import { validationResult } from "express-validator";

class categoryController {
    static create_category = async (req, res) => {
        const { category, verify } = req.body;
        try {
            await Promise.all(categoryValidation.map(validation => validation.run(req)));
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: "errors", errors: errors.mapped() });
            }             
            if (category && verify) {
                const categoryDb = await categoryModel.findOne({ category: category});
                if(categoryDb && (categoryDb.is_verified===true)){
                  return  res.status(400).json({ status: "pandding", message: "This Category Already Exist" });
                }
                const newCategory = new categoryModel({ category, verify });
                await newCategory.save();
               return res.status(201).json({ status: "success", message: "Category created successfully" });
            } else {
              return  res.status(400).json({ status: "failed", message: "All Fields are Required" });
            }
        } catch (error) {
            console.error("Error:", error.message);
           return res.status(500).json({ status: "failed", error: "Internal Server Error" });
        }
    };
}

export default categoryController;
