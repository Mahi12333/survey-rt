import jwt from "jsonwebtoken";
import userroleModel from "../../model/backend/userroleModel.js";
import connectDB from "../../database/connection.js";

const AuthorizedUser = (allowedRoles) => {
    return async (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
          return  res.render("backend/pages/login/auth_message", { message: " You Are Not Authorized " });
        }
        try {
            //! Verify Token
            const Authuser_id = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const AuthuserDetails = await userroleModel.findOne({ _id: Authuser_id.userID });
            if (AuthuserDetails) {
                const userRole =parseInt(AuthuserDetails.role);
                const db = await connectDB();
                if (!db) {
                    console.error("Error connecting to MongoDB");
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                const role_tbl = db.collection("role");
                const roleData = await role_tbl.findOne({_id:userRole});
                const rolename=roleData.role_name;
                if (rolename.includes(allowedRoles)) {
                    res.locals.rolename = rolename;
                    return  next();
                }
                if(rolename!==allowedRoles){
                    return  res.render("backend/pages/login/auth_message", { message: `${rolename} Can Access This Page` });
                }
            }
        } catch (error) {
            return res.render("backend/pages/login/auth_message", { message: "You Are Unauthorized" });
        }
    }
}
export default AuthorizedUser;

