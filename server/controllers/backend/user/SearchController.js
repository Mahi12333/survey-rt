import connectDB from "../../../database/connection.js";
import userroleModel from "../../../model/backend/userroleModel.js";



class SearchController {
  static userSearch = async (req, res) => {
    const { q } = req.query;
    try {     
      const page=parseInt(req.query.page);
      const limit=parseInt(req.query.limit);
      const db = await connectDB();
      if (!db) {
        console.error("Error connecting to MongoDB");
       return res.status(500).json({ error: "Internal Server Error" });
      }
      const userroleData = await userroleModel.find({
        username: { $regex: q},
      });
      
      const startIndex = (page - 1) * limit
      const lastIndex = (page) * limit
      if (!userroleData || userroleData.length === 0) {
        res.json({ message: "No users found" });
        return;
      }
      const role_tbl = db.collection("role");
      const permission_tbl = db.collection("permissions");

      const responseDataArray = await Promise.all(
        userroleData.map(async (user) => {
          const userrole = parseInt(user.role);
          const roleData = await role_tbl.findOne({ _id: userrole });

          let permissionIds;
          if (user.permission) {
            permissionIds = user.permission.split(",").map((id) => parseInt(id));
            const permissionData = await permission_tbl
              .find({ _id: { $in: permissionIds } })
              .toArray();
            const userPermissions = permissionData.map(
              (permission) => permission.role_name
            );
            return {
              role: roleData.role_name,
              permissions: userPermissions,
              username: user.username,
              email: user.email,
              mobile: user.mobile,
              verify: user.is_verified,
            };
          }else{
            return {
              role: roleData.role_name,
              permissions: [],
              username: user.username,
              email: user.email,
              mobile: user.mobile,
              verify: user.is_verified,
            };
          }
        })
      );
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
    return  res.json(results)
    } catch (error) {
      console.error("Error fetching search ", error);
    return  res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

export default SearchController;
