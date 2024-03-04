import categoryModel from "../../../model/backend/categoryModel.js";
import subcategoryModel from "../../../model/backend/subcategoryModel.js";
import productModel from "../../../model/backend/productModel.js";
import { productValidation } from "../../../validations/product.js";
import { validationResult } from "express-validator";

class ProdutCreateController {
    static product_category = async (req, res) => {
        try {
            const category = await categoryModel.find({});
            const responseData = {
                category: category,
            };
            return res.json(responseData);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static product_subcategory = async (req, res) => {
        try {
            const id = req.params.id;
            const subcategory = await subcategoryModel.find({ category: id });
            const responseData = {
                subcategory: subcategory,
            };
            return res.json(responseData);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    static product_create = async (req, res) => {
        try {
            const images = req.files;
            if (images.length === 0) {
                return res
                    .status(400)
                    .json({ status: "failedimg", message: "Images are required" });
            }
            await Promise.all(
                productValidation.map((validation) => validation.run(req)),
            );
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ status: "errors", errors: errors.mapped() });
            }
            const { category, subcategory, product,checkbox,org_price,discount,curr_price } = req.body;
            if (category && subcategory && product && images && checkbox && org_price && discount && curr_price ) {
                const imagesArray = images.map(image => image.filename);
                const existingProduct = await productModel.exists({
                    category,
                    subcategory,
                    product
                });
                if (existingProduct) {
                    return res
                        .status(401)
                        .json({ status: "padding", message: "Data Already Exists" });
                }
                const info = new productModel({
                    category,
                    subcategory,
                    product,
                    images:imagesArray,
                    checkbox:checkbox,
                    size:checkbox,
                    org_price:org_price,
                    discount:discount,
                    curr_price:curr_price,
                });
                const save = await info.save();
                if (save) {
                    return res.status(200).json({ status: "success", message: "Data Successfully Upload" });
                } else {
                    return res.status(400).json({ status: "failed", message: "Data Not Successfully Upload" });
                }
            } else {
                return res
                    .status(400)
                    .json({ status: "failed", message: "All Fields are Required" });
            }
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };
}
export default ProdutCreateController;
