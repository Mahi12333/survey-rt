import categoryModel from "../../../model/backend/categoryModel.js";
import subcategoryModel from "../../../model/backend/subcategoryModel.js";
import { subcategoryValidation } from "../../../validations/subcategory.js";
import { validationResult } from "express-validator";


class subcaegory_updated {
    static updted_subcate = async (req, res) => {
        const id = req.params.id;
        try {
            // console.log(id)
                if(!id)
                {
                   return res.status(400).json({error:"Category Id is Not Valied"})
                }
                const categoryData = await categoryModel.find({});
                const subcategory=await subcategoryModel.findOne({_id:id});
                const cate_id=subcategory.category.toString();
                const category=await categoryModel.findOne({_id:cate_id});
                const cate_name=category.category;
               const responseData = {
                allcategory: categoryData,
                subcategorys:subcategory,
                category:cate_name,
            };
             return res.render("backend/pages/subcategory/update_subcategory",{data:responseData});
        } catch (error) {
           return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static updated_process= async (req,res)=>{
        const{category,subcategory,verify,subId}=req.body;
        const id = req.params.id;
        try {
            await Promise.all(subcategoryValidation.map(validation => validation.run(req)));
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: "errors", errors: errors.mapped() });
            }
            const subcategorytbl=await subcategoryModel.find({category:category});
            if(subcategorytbl.length>0){
                const existSubcategory=subcategorytbl.map(sub=>sub.subcategory);
                if(existSubcategory.includes(subcategory)){
                    return res.status(401).json({status: "success", message:"Data Aleady Exits"});
                }
            }    
            const info= await subcategoryModel.findByIdAndUpdate(
                subId,
                {$set:{category:category,subcategory:subcategory,is_verified:verify}},
                {new:true}
            )
            if(info){
                return res.status(200).json({status: "success",message:"Data Successfully Updated"});;
            }else{
                return res.status(400).json({status: "failed",message:"Data Not Successfully Updated"});
               }  
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default subcaegory_updated;