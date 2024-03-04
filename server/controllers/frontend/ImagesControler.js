import productModel from "../../model/backend/productModel.js";
import NodeCache from "node-cache";
const nodeCache = new NodeCache();

class ImagesController {
    static allimages = async (req, res) => {
        try {
            const cachedData = nodeCache.get("allImages");
            if (cachedData) {
                const allImages=cachedData;
                return res.json(allImages);
            }

            const pipeline = [
                {
                    // images: { $arrayElemAt: ["$images", 0] },  // only one image ko fetch karne keliye
                    $project: {
                        images: 1,
                        org_price: 1,
                        curr_price: 1,
                        product: 1,
                        _id: 1
                    }
                }
            ];

            const products = await productModel.aggregate(pipeline);

            // Set data in cache
            nodeCache.set("allImages", products);

            return res.json(products);
        } catch (error) {
            return res.status(500).send({ message: "An error occurred while fetching images." });
        }
    };
}

export default ImagesController;
