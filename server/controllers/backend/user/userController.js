import userModel from "../../../model/backend/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../../../../config/sendEmail.js";
import userroleModel from "../../../model/backend/userroleModel.js";


class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, password_confirmation, tc } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user != null) {
      if (user.is_verified === true) {
        res.send({ status: "failed", message: "Email already exists" });
      } else {
        res.send({
          status: "failed",
          message: "Verification Email Sent... Please Check Your Email",
        });
      }
    } else {
      if (name && email && password && password_confirmation && tc) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const doc = new userModel({
              name: name,
              email: email,
              password: hashPassword,
              tc: tc,
              is_verified: true,
            });
            const succSend = await doc.save();
            if (succSend) {
              const user = await userModel.findOne({ email: email });
              if (user) {
                const secret = user._id + process.env.JWT_SECRET_KEY;
                //!Generate JWT Token
                const token = jwt.sign({ userID: user._id }, secret, {
                  expiresIn: "5d",
                });
                // Generate JWT Token
                res
                  .status(201)
                  .send({
                    status: "success",
                    message: "Registration Success",
                    token: token,
                  });
              }
            } else {
              res
                .status(201)
                .send({ status: "failed", message: "Registration Faild" });
            }
          } catch (error) {
            console.log(error);
            res.send({ status: "failed", message: "Unable to Register" });
          }
        } else {
          res.send({
            status: "failed",
            message: "Password and Confirm Password doesn't match",
          });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  // static varifyRegistration=async (req,res)=>{
  //   console.log("api");
  //   const {is_verified} =req.body;
  //   const { id, token } = req.params;
  //   const user = await userModel.findById(id);
  //     //!Generate new_secret
  //   const new_secret = user._id + process.env.JWT_SECRET_KEY;
  //   try {
  //     if(jwt.verify(token,new_secret))
  //     {
  //       res.render('backend/pages/login/successRegister');
  //     }else{
  //       res.status(201).send({ "status": "failed", "message": "Registration Faild"});
  //     }
  //     if(is_verified){

  //     await userModel.findByIdAndUpdate(user._id,{$set:{is_verified:is_verified}})
  //     res.send({ "status": "success", "message": "Registration Successfully","token":token });
  //     }
  //     else{
  //       es.send({ "status": "failed", "message": "Registration Faild"});
  //     }
  //   } catch (error) {
  //     res.status(201).send({ "status": "failed", "message": "Registration Faild"})
  //   }
  // }

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await userroleModel.findOne({ email: email });
        if (user != null && user.is_verified === true) {
          const matchPass = await bcrypt.compare(password, user.password);
          if (user.email == email && matchPass) {
            //! Generate JWT Token
            const token = jwt.sign(
              { userID: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "1d" },
            );           
            res.cookie('token', token, {
              httpOnly: true,
              secure: process.env.JWT_SECRET_KEY === 'production', 
              sameSite: 'strict',
            });
            res.status(201).json({
            status: "success",
            message: "Login Success",
            token: token,
            // user:user.username,
          });
          } else {
          return  res.status(400).json({
              status: "failed",
              message: "Email or Password is not Valid",
            });
          }
        } else {
         return res.send({ status: "failed", massage: "Email dose't Exist" });
        }
      } else {
      return  res.send({ status: "failed", massage: "All fields are required" });
      }
    } catch (error) {
    return  res.send({ status: "failed", message: "Unable To Login" });
    }
  };

  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
      return  res.status(400).json({
          status: "failed",
          message: "New Password and Confirm New Password doesn't match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await userroleModel.findByIdAndUpdate(req.user._id, {
          $set: { password: newHashPassword },
        });
      return  res.status(201).json({
          status: "success",
          message: "Password changed succesfully",
        });
      }
    } else {
    return  res.status(400).json({ status: "failed", message: "All Fields are Required" });
    }
  };

  static loggedUser = async (req, res) => {
    res.send({ users: req.user });
  };

  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await userroleModel.findOne({ email: email });
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userID: user._id }, secret, {
          expiresIn: "15m",
        });
        const link = `http://127.0.0.1:4000/api/user/reset-password/${user._id}/${token}`;
        console.log(link);
        //* Send Email
        let info = await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Password Reset Link",
          text: link,
          // html: `<a href=${link}>Click Here</a> to Reset Your Password`
        });
       return res.status(201).json({
          status: "success",
          message: "Password Reset Email Sent... Please Check Your Email",
        });
      } else {
      return  res.status(400).json({ status: "failed", message: "Email doesn't exists" });
      }
    } else {
     return res.status(400).json({ status: "failed", message: "Email Field is Required" });
    }
  };

  static getallowPassreset = async (req, res) => {
    const { id, token } = req.params;
    const user = await userroleModel.findById(id);
    if (!user) {
     return res.render("backend/pages/login/message", {
        message: "Email doesn't exists",
      });
    }
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
      const verify = jwt.verify(token, new_secret);
      if (verify) {
      return  res.render("backend/pages/login/forget", {
          message: "Now You Are Allow To Reset Password",
          id:id,
          token: token,
        });
      } else {
       return res.render("backend/pages/login/message", {
          message: "You Are Not Allow To Reset Password",
        });
      }
    } catch (error) {
      console.log(error);
     // res.send({ "status": "failed", "message": "Invalid Token" });
     return res.render("backend/pages/login/message", { message: "Invalid Token" });
    }
  };

  static userPasswordReset = async (req, res) => {
    const { password, confirm_password } = req.body;
    const { id, token } = req.params;
    const user = await userroleModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
      jwt.verify(token, new_secret);
      if (password && confirm_password) {
        if (password !== confirm_password) {
         return res.status(400).json({
            status: "failed",
            message: "New Password and Confirm New Password doesn't match",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          await userroleModel.findByIdAndUpdate(user._id, {
            $set: { password: newHashPassword },
          });
        return  res.status(201).json({
            status: "success",
            message: "Password Reset Successfully",
          });
        }
      } else {
       return res.status(400).json({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
     return res.status(400).json({ status: "failed", message: "Invalid Token" });
    }
  }; 
}

export default UserController;
