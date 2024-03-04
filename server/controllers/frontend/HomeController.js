const homePage=async (req,res)=>{
  return  res.status(200).json(
        {
            text1:"E-shop",
            text2:"Ecommerce"
        }
    );
};


// const cartPage=async (req,res)=>{
    
//     console.log("controller");
//      res.status(200).json(
//          {
//              text1:"E-shop",
//              text2:"Ecommerce"
//          }
//      );
//  };
 
export default homePage;  