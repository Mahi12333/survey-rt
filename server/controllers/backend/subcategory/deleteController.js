import subcategoryModel from "../../../model/backend/subcategoryModel.js";

class subcategoryDelete{
    static deletesubCategory= async (req,res) =>{
        try {
            const {subcate_Id}=req.params;
            if(subcate_Id){
                const subcategory=await subcategoryModel.findByIdAndDelete(subcate_Id);
                if(subcategory){
                       return res.status(200).json({status:"success", message: "SubCategory deleted successfully",data: subcategory});
                }else{
                    return res.status(400).json({status:"failed", message: "SubCategory Not deleted successfully",data: subcategory});
                }
            }else{
                return   res.status(400).json({ error: 'Bad Request: Missing userId parameter' });
            }
        } catch (error) {
            return  res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}
export default subcategoryDelete;