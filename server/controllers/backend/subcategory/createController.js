import categoryModel from "../../../model/backend/categoryModel.js";
import subcategoryModel from "../../../model/backend/subcategoryModel.js";
import { subcategoryValidation } from "../../../validations/subcategory.js";
import { validationResult } from "express-validator";

class subCateController{
    static fetchCategory=async (req,res)=>{
       try {
        const category=await categoryModel.find();
        return res.json(category);
       } catch (error) {
          return res.status(400).json({error:"Internal Server Error"});
       }
    };

static createSubcategory=async (req,res)=>{
        try {
            console.log(req.body)
            const {category,subcategory,verify}=req.body;
            await Promise.all(subcategoryValidation.map(validation => validation.run(req)));
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: "errors", errors: errors.mapped() });
            } 
            
            const existingSubcategory = await subcategoryModel.exists({ category, subcategory });
                if (existingSubcategory) {
                   return res.status(401).json({ status: "padding", message: "Data Already Exists" });
                  }
            
            // const subcategorytbl=await subcategoryModel.find({category:category});           
            // const existSubcategory=subcategorytbl.map(sub=>sub.subcategory);
            // console.log(existSubcategory);
            // if(existSubcategory.includes(subcategory)){
            //     return res.status(401).json({status: "padding", message:"Data Aleady Exits"});
            // }



                const  info= new subcategoryModel({
                    category,
                    subcategory,
                    verify
                });
            const save= await info.save();
           if(save){
             return res.status(200).json({status: "success",message:"Data Successfully Upload"});
           }else{
            return res.status(400).json({status: "failed",message:"Data Not Successfully Upload"});
           }
            
            
        } catch (error) {
            return res.status(500).json({error:"Internal Server Error"}); 
        }
    };

}
export default subCateController;