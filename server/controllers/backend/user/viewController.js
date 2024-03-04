import userroleModel from "../../../model/backend/userroleModel.js";
import connectDB from "../../../database/connection.js";
import NodeCache from "node-cache";
const nodeCache = new NodeCache();

class AllviewController {
  static userView = async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      //! Check cache first
      const cacheKey = `page_${page}_limit_${limit}`;
      const cachedData = nodeCache.get(cacheKey);
      if (cachedData) {
        const results = cachedData;
        return res.json(results);
      }

      const db = await connectDB();
      if (!db) {
        console.error("Error connecting to MongoDB");
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const startIndex = (page - 1) * limit;
      const lastIndex = page * limit;
      const userroleData = await userroleModel.find({});
      if (!userroleData || userroleData.length === 0) {
        return res.json({ message: "No users found" });
      }
      const role_tbl = db.collection("role");
      const permission_tbl = db.collection("permissions");

      const responseDataArray = await Promise.all(
        userroleData.map(async (user) => {
          const userrole = parseInt(user.role);
          const roleData = await role_tbl.findOne({ _id: userrole });

          let permissionIds;
          permissionIds = user.permission.split(",").map((id) => parseInt(id));
          const permissionData = await permission_tbl
            .find({ _id: { $in: permissionIds } })
            .toArray();
          const userPermissions = permissionData.map(
            (permission) => permission.role_name
          );
          return {
            id: user._id,
            role: roleData.role_name,
            permissions: userPermissions,
            username: user.username,
            email: user.email,
            mobile: user.mobile,
            verify: user.is_verified,
          };
        })
      );
      let results = {};
      results.totalEntries = responseDataArray.length;
      results.pageCount = Math.ceil(responseDataArray.length / limit);
      if (lastIndex < responseDataArray.length) {
        results.next = {
          page: page + 1,
        };
      }
      if (startIndex > 0) {
        results.prev = {
          page: page - 1,
        };
      }
      results.result = responseDataArray.slice(startIndex, lastIndex);

      // Set cache
      nodeCache.set(cacheKey, results);
      return res.json(results);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default AllviewController;
