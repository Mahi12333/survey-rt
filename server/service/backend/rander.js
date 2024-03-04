//import UserController from "../../controllers/backend/userController.js";

import axios from "axios";

// Create axios instance with a base URL
const api = axios.create({
    baseURL: "http://localhost:4000/api/user/",
  });
  
  // Extract 'get' method from the axios instance
  const { get } = api;
  

const backhomeRoute = (req, res) => {
    //console.log('Backhome route is called!');
    try {
      return res.render("backend/index");
    } catch (error) {
        console.log("Error", error);
    }
}

const backproductRoute=(req,res)=>{   
    try {
      return  res.render("backend/pages/product/productlist");
    } catch (error) {
        console.log("Error", error);
    }
}

const backuserRoute=(req,res)=>{
    try {
      return  res.render("backend/pages/users/users");
    } catch (error) {
        console.log("Error", error);
    }
}
const backtablesRoute=(req,res)=>{  
    try {
      return  res.render("backend/pages/tables/basic-table");
    } catch (error) {
        console.log("Error", error);
    }
}

const backloginRoute=(req,res)=>{
    try {
     return   res.render("backend/pages/login/login");
    } catch (error) {
        console.log("Error", error);
    }
}
// const backforgetRoute=(req,res)=>{
//     try {
//         res.render("backend/pages/login/forget");
//     } catch (error) {
//         console.log("Error", error);
//     }
// }
const backregisterRoute=(req,res)=>{
    try {
      return  res.render("backend/pages/login/register");
    } catch (error) {
        console.log("Error", error);
    }
}
// const backsucssregisterRoute=(req,res)=>{
//     try {
//         res.render("backend/pages/login/sucssregister");
//     } catch (error) {
//         console.log("Error", error);
//     }
// }

const sendEmailroute=(req,res)=>{
    try {
      return  res.render("backend/pages/login/send_mail_resetpass");
    } catch (error) {
        console.log("Error", error);
    }
}
const backchangePassRoute=(req,res)=>{
    try {
      return  res.render("backend/pages/login/changePassword");
    } catch (error) {
        console.log("Error", error);
    }
}

const add_userRoute=async (req,res)=>{
    try {
        const response = await get("ui-user");
       return res.render("backend/pages/users/add_user",{data: response.data });
    } catch (error) {
        console.log("Error", error);
    }
}

const user_tableRoute= (req,res)=>{
    try {
      return  res.render("backend/pages/users/users");
    } catch (error) {
        console.log("Error", error);
    }
}
// const update_userRoute=(req,res)=>{
//     try {
//         res.render("backend/pages/users/update_user");
//     } catch (error) {
//         console.log("Error", error);
//     }
// }

const add_category=(req,res)=>{
    try {
      return  res.render("backend/pages/category/add_category",{ errors:''});
    } catch (error) {
        console.log("Error", error);
    }
}

const category_tableRoute=async (req,res)=>{
    try {
        return res.render("backend/pages/category/category_list");
    } catch (error) {
        console.log("Error", error);
    }
}

// const updated_category=async (req,res)=>{
//     try {
//         return res.render("backend/pages/category/update_category");
//     } catch (error) {
//         console.log("Error", error);
//     }
// }

const subcategoryRoute=async (req,res)=>{
    try {
        const response = await get("list-category");
        return res.render("backend/pages/subcategory/add_subcategory",{data: response.data });
    } catch (error) {
        console.log("Error", error);
    }
}
const subcategoryTableRoute=async (req,res)=>{
    try {
        //const response = await get("subcategory-view");
        return res.render("backend/pages/subcategory/subcategorylist");
    } catch (error) {
        console.log("Error", error);
    }
}

const add_product=async (req,res)=>{
    try {
       
        const response = await get("/product-category");
        return res.render("backend/pages/product/add_product",{data:response.data});
    } catch (error) {
        console.log("Error", error);
    }
}

export { backhomeRoute,backproductRoute,backuserRoute,backtablesRoute,backloginRoute,backregisterRoute,sendEmailroute,backchangePassRoute,add_userRoute,user_tableRoute,add_category,category_tableRoute,subcategoryRoute,subcategoryTableRoute,add_product};
