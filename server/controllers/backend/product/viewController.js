import categoryModel from "../../../model/backend/categoryModel.js";
import subcategoryModel from "../../../model/backend/subcategoryModel.js";
import productModel from "../../../model/backend/productModel.js";

class productviewController {
  static productView = async (req, res) => {
    try {
      const page=parseInt(req.query.page);
      const limit=parseInt(req.query.limit);  
      const startIndex = (page - 1) * limit
      const lastIndex = (page) * limit
      const productData = await productModel.find({});
      if (!productData || productData.length === 0) {
      return  res.json({ message: "No users found" });
      }     
      const responseDataArray = await Promise.all(productData.map(async (product) => {      
      const cate_id=product.category;
      const sub_id=product.subcategory;
      const category = await categoryModel.findOne({_id:cate_id}); 
      const cate_name= category.category;
      const subcategory = await subcategoryModel.findOne({_id:sub_id}); 
      const sub_name= subcategory.subcategory;

        return {
          id:product._id,
          product:product,
          category:cate_name,
          subcategory:sub_name,
          
        };        
      }));
      const results = {}
      results.totalEntries=responseDataArray.length;
      results.pageCount=Math.ceil(responseDataArray.length/limit);
      if (lastIndex < responseDataArray.length) {
        results.next = {
          page: page + 1,
        }
      }
      if (startIndex > 0) {
        results.prev = {
          page: page - 1,
        }
      }
      results.result = responseDataArray.slice(startIndex, lastIndex);
    return  res.json(results);

    } catch (error) {
     return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default productviewController;