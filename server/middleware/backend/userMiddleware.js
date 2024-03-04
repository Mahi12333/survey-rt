import jwt from "jsonwebtoken";
import userroleModel from "../../model/backend/userroleModel.js"

const checkUserAuth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.render("backend/pages/login/role_message", { message: " You Are Not Authorized " });
    }
    try {
        //! Verify Token
        const Authuser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userroleModel.findOne({ _id: Authuser.userID });
        //! Get User from Token
        if (Authuser) {
          res.locals.username = user.username;
          return  next();
        }
    } catch (error) {
        return  res.render("backend/pages/login/role_message", { message: " You Are Unauthorized " });
    }
}



export default checkUserAuth;