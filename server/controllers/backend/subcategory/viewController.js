import subcategoryModel from "../../../model/backend/subcategoryModel.js";
import NodeCache from "node-cache";
const nodeCache = new NodeCache();

class subcategoryviewController {
  static subcategoryView = async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);  

      const cacheKey = `page_${page}_limit_${limit}`;
      const cachedData = nodeCache.get(cacheKey);
      if (cachedData) {
        return res.json(cachedData);
      }

      const pipeline=[
        {
          $addFields: {
            "categoryObjectId": { "$toObjectId": "$category" }
          }
        },
      
        {
          $lookup: {
            from: "categories",
            localField: "categoryObjectId",
            foreignField: "_id",
            as: "categorydata",
          },
        },
        
        {
          $project: {
            _id: 1,
            category: { $arrayElemAt: ["$categorydata.category", 0] },
            subcategory: 1,
            is_verified: 1
          }
        }
      ];

      const subcategoryData = await subcategoryModel.aggregate(pipeline);

      const startIndex = (page - 1) * limit;
      const lastIndex = page * limit;
      const totalEntries = subcategoryData.length;
      const pageCount = Math.ceil(totalEntries / limit);

      const paginatedData = subcategoryData.slice(startIndex, lastIndex);

      const results = {
        next: null,
        prev: null,
        totalEntries: totalEntries,
        pageCount: pageCount,
        result: paginatedData
      };

      if (lastIndex < subcategoryData.length) {
        results.next = {
          page: page + 1,
        };
      }
      if (startIndex > 0) {
        results.prev = {
          page: page - 1,
        };
      }

      // Set cache
      nodeCache.set(cacheKey, results);

      return res.json(results);

    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default subcategoryviewController;
