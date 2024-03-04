import categoryModel from "../../../model/backend/categoryModel.js";

class categoryviewController {
  static categoryView = async (req, res) => {
    try {
      const categoryData = await categoryModel.find();
       const cate_response={
        category:categoryData,
       } 
      return res.json(cate_response);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default categoryviewController;