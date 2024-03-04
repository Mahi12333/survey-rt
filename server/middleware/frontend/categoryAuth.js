// Import categoryModel and subcategoryModel
import categoryModel from "../../model/backend/categoryModel.js";
import subcategoryModel from "../../model/backend/subcategoryModel.js";

// Create categoryAuth middleware function
const categoryAuth = async (req, res, next) => {
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
        // Assign categories data to res.locals
        res.locals.categories = categoriesWithSubcategories;
        next();
    } catch (error) {
        console.error("Error fetching categories:", error);
        return res.status(500).send("Internal Server Error");
    }
};

export default categoryAuth;
