import jwt from "jsonwebtoken";
import userModel from "../../model/frontend/userModel.js";

const checkUserAuth = async (req, res, next) => {
    const token = req.cookies.frontoken;
    try {
    if (!token) {
        res.locals.loggedIn = false;
        return  next();
    }
        //! Verify Token
        const Authuser = jwt.verify(token, process.env.JWT_Fortend_KEY);
       const user = await userModel.findOne({ _id: Authuser.userID });
        //! Get User from Token
        if (Authuser) {
            res.locals.loggedIn = true;
            res.locals.username=user.name;
            res.locals.userID=user._id;
            req.session.userId = user._id.toString(); 
          return  next();
        }
    } catch (error) {
        return  res.render({ message: " You Are Unauthorized " });
    }
}


export default checkUserAuth;