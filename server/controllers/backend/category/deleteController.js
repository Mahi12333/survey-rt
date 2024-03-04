import categoryModel from "../../../model/backend/categoryModel.js";

class categoryDelete{
    static deleteCategory= async (req,res) =>{
        try {
            const {cate_Id}=req.params;
            console.log(cate_Id);
            if(cate_Id){
                const category=await categoryModel.findByIdAndDelete(cate_Id);
                if(category){
                       return res.status(200).json({status:"success", message: "Category deleted successfully",data: category});
                }else{
                    return res.status(400).json({status:"failed", message: "Category Not deleted successfully",data: category});
                }
            }else{
                return   res.status(400).json({ error: 'Bad Request: Missing userId parameter' });
            }
        } catch (error) {
            return  res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}
export default categoryDelete;