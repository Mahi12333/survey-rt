import categoryModel from "../../model/backend/categoryModel.js";
import subcategoryModel from "../../model/backend/subcategoryModel.js";

class Cate_SubController {
    static category = async (req, res) => {
        try {
            const categories = await categoryModel.find({});
            const categoriesWithSubcategories = [];
            for (const category of categories) {
                const subcategories = await subcategoryModel.find({ category: category._id });
                const subcategoryNames = subcategories.map(subcategory => subcategory.subcategory);

                const categoryWithSubcategories = {  
                    category: category.category,
                    subcategories: subcategoryNames,
                    subcategoryCount: subcategories.length
                };

                categoriesWithSubcategories.push(categoryWithSubcategories);
            }
            return  res.send(categoriesWithSubcategories);
        } catch (error) {
            console.error("Error fetching categories:", error);
            return  res.status(500).send("Internal Server Error");
        }
    };
}

export default Cate_SubController;
