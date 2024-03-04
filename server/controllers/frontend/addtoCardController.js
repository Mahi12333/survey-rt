
import AddtoCard from "../../model/frontend/cardModule.js";

class addtoCardController{
    static addToCart = async (req, res) => {
        try {
            const userId = req.session.userId;
            const {productId } = req.body; 
            if(!productId){
                return res.status(401).json({ success: false, message: 'Product Id is Undefind' });
            }
            if(userId){              
                let userCart = await AddtoCard.findOne({ userid: userId });
                if(userCart){
                    await AddtoCard.findOneAndUpdate(
                        { userid: userId }, 
                        { $addToSet: { cartItems: productId } }, 
                        { upsert: true } 
                    );      
                }else{
                    const info= new  AddtoCard({
                        userid:userId,
                        cartItems:productId
                    });
                    await info.save();
                }
                  
            }else{
                let cartItems = req.cookies.cartItems || [];
                const productExists = cartItems.includes(productId);
            if (!productExists) {
                cartItems.push(productId);
                res.cookie('cartItems', cartItems, { maxAge: 1000 * 60 * 60 * 24 * 7 });    
                return res.status(200).json({ success: true, message: 'Product added to cart successfully', cartItems });
            }
            return res.status(200).json({ success: true, message: 'Product already exists in the cart', cartItems });
            }
          
        } catch (error) {
            console.error('Error adding product to cart:', error);
            return res.status(500).json({ success: false, message: 'An error occurred while adding the product to cart' });
        }
    };

        static getCardItem=async (req,res)=>{
            try {
                const userId = req.session.userId;
                if(userId){
                    const cartItems=await AddtoCard.find({userid:userId});
                    res.status(200).json({ success: true, cartItems });
                }else{
                   const cartItems = req.cookies.cartItems || [];
                   res.status(200).json({ success: true, cartItems });
                }  
            } catch (error) {
                console.error('Error retrieving cart items:', error);
                return  res.status(500).json({ success: false, message: 'An error occurred while retrieving cart items' });
            }
        };
}

export default addtoCardController ;
