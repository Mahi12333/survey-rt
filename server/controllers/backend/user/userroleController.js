import connectDB from "../../../database/connection.js";
import userroleModel from "../../../model/backend/userroleModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../../../../config/sendEmail.js";
import crypto from "crypto";

class UserroleController {
  static fecthPermission = async (req, res) => {
    try {
      const db = await connectDB();
      if (!db) {
        console.error("Error connecting to MongoDB");
       return res.status(500).json({ error: "Internal Server Error" });
       
      }
      const permission_tbl = db.collection("permissions");
      const permissionData = await permission_tbl.find({}).toArray();
      const role_tbl = db.collection("role");
      const roleData = await role_tbl.find({}).toArray();
      const responseData = {
        permissions: permissionData,
        roles: roleData,
      };
     return res.json(responseData);
    } catch (error) {
      console.log(error);
     return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static createuserRole = async (req, res) => {
    try {
      const { role, permission, name, email, mobile, password, cpassword } = req.body;
      const user = await userroleModel.findOne({ email: email });
      if (user && (user.is_verified === true)) {
      return  res.send({ status: "failed", message: "Email already exists" });
      } else {
        if (role && permission && name && email && mobile && password && cpassword) {
          if (password === cpassword) {
            try {
              const salt = await bcrypt.genSalt(10);
              const hashPassword = await bcrypt.hash(password, salt);
              if (role && permission && name && email) {
                const db = await connectDB();
                if (!db) {
                return  res.status(500).json({ error: "Internaldd Server Error" });
                }
                const permission_tbl = db.collection("permissions");
                const permissionIds = permission.map((id) => parseInt(id));
                const permissionData = await permission_tbl
                  .find({ _id: { $in: permissionIds } })
                  .toArray();
                const permissionNames = permissionData.map(
                  (permission) => permission.role_name,
                );
                const formattedPermissions = permissionNames.join(", ");
                const role_tbl = db.collection("role");
                const roleIds = parseInt(role);
                const roleData = await role_tbl.findOne({ _id: roleIds });
                const roleNames = roleData.role_name;
                const secret = process.env.JWT_SECRET_KEY;
                const dataToEncrypt = {
                  role: role,
                  permission: permission,
                  name: name,
                  email: email,
                  mobile:mobile,
                  password:hashPassword
                };
               const jsonString = JSON.stringify(dataToEncrypt);                
               const cipher = crypto.createCipher('aes-256-cbc',secret);
               let encryptedData = cipher.update(jsonString, 'utf-8', 'hex');
               encryptedData += cipher.final('hex');             
               const token = jwt.sign({encryptedData},secret,{
                  expiresIn: "1d",
                });               
                const link = `http://127.0.0.1:4000/api/user/verifyUsermail/${token}`;
                console.log(link);
                //* Send Email
                let info = await transporter.sendMail({
                  from: process.env.EMAIL_FROM,
                  to: email,
                  subject: "Email Verification Invitation Link - ",
                  html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" >
                  <html xmlns="http://www.w3.org/1999/xhtml">
                  <head>
                      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                      <title>Html Mail Tamplate</title>
                      <style type="text/css">
                       body{
                          margin:0;
                          background-color: #cccccc;
                       }
                       table{
                          border-spacing: 0;
                       }
                       td{
                          padding: 0;
                       }
                       img{
                          border: 0;
                       }
                  
                       .wrapper{
                          width: 100%;
                          table-layout: fixed;
                          background-color: #FFFF00;
                          padding-bottom: 60px;
                       }
                       .main{
                          background-color: #ffffff;
                          margin: 0 auto;
                          width: 100%;
                          max-width: 600px;
                          border-spacing: 0;
                          font-family: sans-serif;
                          color: #171a1b;
                       }
                       .two-colums{
                          text-align: center;
                          font-size: 0;
                          
                       }
                       .two-colums .column{
                          width: 100%;
                          max-width: 300px;
                          display: inline-block;
                          vertical-align: top;
                          text-align: center;
                       }
                       .three-column{
                          text-align: center;
                          font-size: 0;
                          padding: 15px 0 25px;
                       }
                       .three-column .column{
                          width: 100%;
                          max-width: 200px;
                          display: inline-block;
                          vertical-align: top;
                          text-align: center;
                       }
                       .three-column .padding{
                          padding: 15px;
                       }
                       .three-column .content{
                          font-size: 15px;
                          line-height: 20px;
                          padding: 0 5px ;
                       }
                       .two-columns .last{
                          padding: 15px;
                  
                       }
                       .two-columns .padding{
                          padding: 20px;
                       }
                       .two-columns .content{
                          font-size: 18px;
                          line-height:20px ;
                          text-align: left;
                       }
                       .button{
                          background-color: #ffffff;
                          color: #171a1b;
                          text-decoration: none;
                          padding: 12px 20px;
                          font-weight: bold;
                          border-radius: 5px;
                       }
                       .button-dark{
                          background-color: #171a1b;
                          color: #ffffff;
                          text-decoration: none;
                          padding: 12px 20px;
                          font-weight: bold;
                          border-radius: 5px;
                       }
                      </style>
                  
                      
                  </head>
                  
                  <body>
                  <center class="wrapper">
                  <tr style="text-align: left;">
                  <td>
                        <p>Hi! Your Role is ${roleNames} and You are allowed ${formattedPermissions} and Your Password ${password} and Your Email ${email} </p>
                  </td>
                  </tr>
                      <table class="main" width="100%">
                          <!-- Top border -->
                          <tr>
                              <td height="8" style="background-color: #171a1b;">
                              </td>
                          </tr> 
                          <!-- Header -->                 
                          <!-- Banner Image -->
                         <tr>
                          <td>
                              <a href="${link}"><button width="600" height=100 style="max-width: 100%; margin-left:3rem">Verify</button></a></td>
                         </tr>
                                                                          
                      </table>
                  </center>
                  </body>
                  </html>`
                });
                if (info) {
                return  res.send({ status: "success", message: "Send The Email........ Please Tell Do Check" });
                }

              } else {
               return res.send({
                  status: "failed",
                  message: "All fieldsss are required",
                });
              }
            } catch (error) {
            return  res.send({
                status: "failed",
                message: "Password and Confirm Password doesn't match",
              }); 
            }

          } else {
          return  res.send({
              status: "failed",
              message: "Password and Confirm Password doesn't match",
            });
          }
        } else {
        return  res.send({ status: "failed", message: "All fields are required" });
        }
      }
    } catch (error) {
    return  res.status(500).json({ error: "Internal Server Error" });
    }
  };

  static verifyUserMail= async (req,res)=>{
       const {token } = req.params;
    try {
      const secret = process.env.JWT_SECRET_KEY;
      const Verify= jwt.verify(token, secret);
        if (Verify) {
        return  res.render('backend/pages/login/ui_Userverify',{token});
        } else {
        return  res.send({ status: "failed", message: "Token Dose't Match" });
        }
    } catch (error) {
     return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  static responseVerifyMail = async (req,res)=>{
       try {
        const {verify}=req.body;
        const {token } = req.params; 
        const secret = process.env.JWT_SECRET_KEY;
        const Verify= jwt.verify(token, secret); 
        if(Verify){
          const decipher = crypto.createDecipher('aes-256-cbc', secret);
          let decryptedData = decipher.update(Verify.encryptedData, 'hex', 'utf-8');
          decryptedData += decipher.final('utf-8');
          const decryptedObject = JSON.parse(decryptedData);
          // res.cookie('token', decryptedObject, {
          //   httpOnly: true,
          //   secure: process.env.JWT_SECRET_KEY === 'production', 
          //   sameSite: 'strict',
          // });
          const permissionInt=decryptedObject.permission.toString();  
          const emaildata=decryptedObject.email;
          const user = await userroleModel.findOne({ email: emaildata });
          if(user &&(user.is_verified===true)){
           return res.send({ status: "failed", message: "Email already exists" });
          }else{
           if((decryptedObject!==null) &&(verify)){
            const doc = new userroleModel({
              role: decryptedObject.role,
              permission:permissionInt,
              username: decryptedObject.name,
              email:emaildata,
              mobile:decryptedObject.mobile,
              password:decryptedObject.password,
              is_verified: verify,
            });
           if(doc){
            const succSend = await doc.save();
            if(succSend){
             return res.send({ status: "sucess", message: "Mail is Verified Sucessfully" });
            }else{
            return  res.send({ status: "failed", message: "Mail is Not Verified" });
            }
           }else{
           return res.send({ status: "failed", message: "SomeThings is Wrong" });
           }          
          }
        }
          
        }else{
        return  res.send({ status: "failed", message: "Token Dose't Match" });
        }
       } catch (error) {
       return res.status(500).json({ error: "Internal Server Error" });
       }
  };



}

export default UserroleController;
