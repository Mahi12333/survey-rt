import productModel from "../../model/backend/productModel.js";
import categoryModel from "../../model/backend/categoryModel.js";


class carddetailsController {
    static carddetails = async (req, res) => {
        const { cartItemIds } = req.body;
       // console.log(cartItemIds);
        
        try {  
            const products = await productModel.find({ _id: { $in: cartItemIds } });          
            const extractedData = products.map(product => {
                return {
                    images: product.images[0],
                    org_price: product.org_price,
                    curr_price: product.curr_price
                };
            });
            return res.status(200).json(extractedData);
        } catch (error) {
            console.error("Error fetching carddetails:", error);
            return  res.status(500).json({ message: "An error occurred while fetching products" });
        }
    };
    static singleproductDetails= async (req,res)=>{
        const {productId}=req.params;
        //console.log(productId);
        try {
            const single_Product=await productModel.findOne({_id:productId});
            if(!single_Product){
                return  res.status(400).json({message:"Product Id Missing"});
            }
            const category=await categoryModel.findOne({_id:single_Product.category});
            const data = {
                single_Product,
                cate_name: category.category
            };
          //res.json(data);
           return res.render('frontend/single_product',{data});
        } catch (error) {
            console.error("Error fetching singleproductDetails:", error);
            res.status(500).json({ message: "An error occurred while fetching products" });
        }
    };

    static singlecardDetails= async (req,res)=>{
        const{productId,quantity}=req.params;
        try {
             if(!productId){
                return  res.status(400).json({message:"Product Id Missing"});
             }
             if (!quantity || quantity <= 0) { // Check if quantity is missing or invalid
                return res.status(400).json({ message: "Product Quantity is Invalid" });
            }
             if(quantity){
             const product= await productModel.findOne({_id:productId});
             if(product){
                const data={
                    quantity:quantity,
                    product
                 }
                return res.render('frontend/cardsingleProduct',{data});
             }
            
            }
             
        } catch (error) {
            console.error("Error fetching singlecardDetails:", error);
            return  res.status(500).json({ message: "An error occurred while fetching products" });
        }
    };

    static singlecheckout= async (req,res)=>{
        const{productId,quantity}=req.params;
        try {
            if(!productId){
                return  res.status(400).json({message:"Product Id Missing"});
             }
             if (!quantity || quantity <= 0) { 
                return res.status(400).json({ message: "Product Quantity is Invalid" });
            }
            if(quantity){
                const product= await productModel.findOne({_id:productId});
                if(product){
                   const data={
                       quantity:quantity,
                       product
                    }
                   return res.render('frontend/singlecheckout',{data});
                }              
            }
                
        } catch (error) {
            console.error("Error fetching singlecardDetails:", error);
            return res.status(500).json({ message: "An error occurred while fetching products" });
        }
    }
}

export default carddetailsController;
