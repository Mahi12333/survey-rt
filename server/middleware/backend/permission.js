import jwt from "jsonwebtoken";
import userroleModel from "../../model/backend/userroleModel.js";
import connectDB from "../../database/connection.js";

function CheckAdminPermission(action) {
    return async (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.render("backend/pages/login/auth_message", { message: "You Are Not Authorized" });
        }
        try {
            const Authuser_id = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const AuthuserDetails = await userroleModel.findOne({ _id: Authuser_id.userID });
            if(AuthuserDetails)
            {
                const userPermiss = AuthuserDetails.permission;
                const db = await connectDB();
                if (!db) {
                    console.error("Error connecting to MongoDB");
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                   const permission_tbl = db.collection("permissions");                  
                    let permissionIds;
                    permissionIds = userPermiss.split(',').map(id => parseInt(id));     
                    const permissionData = await permission_tbl.find({ _id: { $in: permissionIds } }).toArray();
                    const userPermissions = permissionData.map(permission => permission.role_name);
                    if (!userPermissions.includes(action)) {
                        //return res.status(403).send('Unauthorized action');
                        return res.render("backend/pages/login/auth_message", { message: "Unauthorized" });
                    }
                   return next();

            }else{
                return res.render("backend/pages/login/auth_message", { message: "You don't have enough permissions to access this page" });
            }
        } catch (error) {
            return res.render("backend/pages/login/auth_message", { message: "You Are Unauthorized" });
        }

    };
}

export default CheckAdminPermission;

