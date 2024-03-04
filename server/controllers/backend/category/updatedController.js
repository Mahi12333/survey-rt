import categoryModel from "../../../model/backend/categoryModel.js";
import { categoryValidation } from "../../../validations/category.js";
import { validationResult } from "express-validator";

class caegory_updated {
    static updted_cate = async (req, res) => {
        const id = req.params.id;
        try {
                if(!id)
                {
                   return res.status(400).json({error:"Category Id is Not Valied"})
                }
                const categoryData=await categoryModel.findOne({_id:id});
                const cate_id=categoryData._id.toString();
                const cate_name=categoryData.category;
               return res.render("backend/pages/category/update_category", {message:'', data1:cate_name,data2:cate_id, errors:''});
        } catch (error) {
           return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static updated_processController=async (req,res)=>{
        const{category,verify,cateId}=req.body;
        try {
            await Promise.all(categoryValidation.map(validation => validation.run(req)));
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render("backend/pages/category/update_category",{message:'',data1:'',data2:cateId,errors: errors.mapped() });
            } 
            if(category && verify && cateId )
            {
                const cate_name=await categoryModel.findOne({_id:cateId});
                if((cate_name.category)===category){
                    return res.render("backend/pages/category/update_category",{message:'Data Already Exist',data1:category,data2:cateId ,errors:'' });
                }
                const info=await categoryModel.findByIdAndUpdate(
                    cateId,
                    {$set:{category:category, is_verified:verify}},
                    {new:true}
                    )
                    if(info){
                        return res.render("backend/pages/category/update_category",{message:'Data Successfully Uploaded',data1:category,data2:cateId, errors:'' });
                    }                    
            }else{
               return res.status(400).json({message:"All Fields are required"});
            }                                
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };
}
export default caegory_updated;