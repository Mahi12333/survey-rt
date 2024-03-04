import categoryModel from "../../../model/backend/categoryModel.js";
import subcategoryModel from "../../../model/backend/subcategoryModel.js";
import productModel from "../../../model/backend/productModel.js";
// import { subcategoryValidation } from "../../../validations/subcategory.js";
// import { validationResult } from "express-validator";


class product_updated {
    static updted_product = async (req, res) => {
        const id = req.params.id;
        try {
                if(!id)
                {
                   return res.status(400).json({error:"Product Id is Not Valied"})
                }
            const productData = await productModel.findOne({ _id: id })
                                                .populate('category')
                                                .exec();
                                                
            if (!productData) {
                return res.status(404).json({ error: "Product not found" });
            }
            const allcategory = await categoryModel.find({});
            const subcategory = await subcategoryModel.find({ category: productData.category._id });

            const responseData = {
                allproduct: productData,
                subcategory: subcategory,
                category: productData.category,
                allcategory: allcategory,
            };

          // return res.send(responseData);
             return res.render("backend/pages/product/updated_product",{data:responseData});
        } catch (error) {
           return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static updated_process= async (req,res)=>{
        const{category,subcategory,product,}=req.body;
        const id = req.params.id;
        console.log(id,category,subcategory,product)
        const images = req.files;
        console.log(images);
        try {
            // await Promise.all(subcategoryValidation.map(validation => validation.run(req)));
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ status: "errors", errors: errors.mapped() });
            // }
            // const subcategorytbl=await subcategoryModel.find({category:category});
            // if(subcategorytbl.length>0){
            //     const existSubcategory=subcategorytbl.map(sub=>sub.subcategory);
            //     if(existSubcategory.includes(subcategory)){
            //         return res.status(401).json({status: "success", message:"Data Aleady Exits"});
            //     }
            // }    
            // const info= await subcategoryModel.findByIdAndUpdate(
            //     subId,
            //     {$set:{category:category,subcategory:subcategory,is_verified:verify}},
            //     {new:true}
            // )
            // if(info){
            //     return res.status(200).json({status: "success",message:"Data Successfully Updated"});;
            // }else{
            //     return res.status(400).json({status: "failed",message:"Data Not Successfully Updated"});
            //    }  
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default product_updated;