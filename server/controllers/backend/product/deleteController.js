import productModel from "../../../model/backend/productModel.js";

class productDelete{
    static deleteproduct= async (req,res) =>{
        try {
            const {pro_Id}=req.params;
            if(pro_Id){
                const product=await productModel.findByIdAndDelete(pro_Id);
                if(product){
                       return res.status(200).json({status:"success", message: "Product deleted successfully",data: product});
                }else{
                    return res.status(400).json({status:"failed", message: "Product Not deleted successfully",data: product});
                }
            }else{
                return   res.status(400).json({ error: 'Bad Request: Missing userId parameter' });
            }
        } catch (error) {
            return  res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}
export default productDelete;