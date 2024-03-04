import axios from "axios";


// Create axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:4000/api/",
});

// Extract 'get' method from the axios instance
const { get } = api;

//console.log('Home route is called!'); 
const homeRoute = async (req, res) => {
  try {       
    const response = await get("allImages");
   // console.log(response);
   return  res.render("frontend/index", { data: response.data });
  } catch (error) {
   return console.log('Error in axios:', error);
    //res.send(error.message);
  }
};


const cartRoute=(req,res)=>{
  return res.render("frontend/cart", { data:"hh" });
}
// const cartRoute=async(req,res)=>{
//   try {     
//     const response = await get("cartPage");
//     res.render("cart", { data: response.data });
//   } catch (error) {
//     console.log('Error in axios:', error);
//     res.send(error.message);
//   }
   
// }

const categoryRoute= async (req,res)=>{
  const response = await get("allImages");
  return  res.render("frontend/category",{ data: response.data });
}

const checkoutRoute=(req,res)=>{
  return  res.render("frontend/checkout");
}

const confirmationRoute=(req,res)=>{
  return res.render("frontend/confirmation",{data:"eee"});
}
const contactRoute=(req,res)=>{
  return res.render("frontend/contact",{data:"hh"})
}
const elementsRoute=(req,res)=>{
  return res.render("frontend/elements",{data:"ee"});
}
const loginRoute=(req,res)=>{
  return res.render("frontend/login",{data:"ee"});
}
const singleblogRoute=(req,res)=>{
  res.render("frontend/single-blog",{data:"ee"});
}
const trackingRoute=(req,res)=>{
  return res.render("frontend/tracking",{data:"ee"});
}
const registrationRoute=(req,res)=>{
  return res.render("frontend/registration",{data:"ee"});
}
const forgotRoute=(req,res)=>{
  return res.render("frontend/forget",{data:"ee"});
}
const sendemailRouter=(req,res)=>{
  return res.render("frontend/sendemail",{data:"ee"});
}
// const ProfileRoute= async (req,res)=>{
//   // const response=await get("fetchprofile");
//   // console.log(response);
//   res.render("frontend/profile");
// }
export { homeRoute,cartRoute,categoryRoute,checkoutRoute,confirmationRoute,contactRoute,elementsRoute,loginRoute,singleblogRoute,trackingRoute,registrationRoute,forgotRoute,sendemailRouter};

