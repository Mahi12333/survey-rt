import userroleModel from "../../../model/backend/userroleModel.js";
import connectDB from "../../../database/connection.js";

class Allupdated_Controller {
    static updted_User = async (req, res) => {
        const id = req.params.id;
        try {
            if (id) {
                const db = await connectDB();
                if (!db) {
                    console.error("Error connecting to MongoDB");
                  return  res.status(500).json({ error: "Internal Server Error" });
                   
                }
                const permission_tbl = db.collection("permissions");
                const permissionData = await permission_tbl.find({}).toArray();
                const role_tbl = db.collection("role");
                const roleData = await role_tbl.find({}).toArray();
                const user = await userroleModel.findOne({ _id: id });
                const responseData = {
                    permissions: permissionData,
                    roles: roleData,
                    user:user
                };
               return res.render("backend/pages/users/update_user", { data: responseData });
            } else {
               return res.status(400).json({ error: "Bad hhRequest: Missing 'id' parameter" });
            }
        } catch (error) {
           return res.status(500).json({ error: "Internal Server Error" });
        }
    };
}
export default Allupdated_Controller;