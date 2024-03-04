import userModel from "../../model/frontend/userModel.js";
import productModel from "../../model/backend/productModel.js";
import Transaction from "../../model/frontend/orderModule.js";

class profileController {
    static profile = async (req, res) => {
        const userId = req.query.id;
        try {
            const user = await userModel.findOne({ _id: userId });
            const orders = await Transaction.find({ userId: user._id,status: "success"});
            const populatedOrders = [];

            for (const order of orders) {
                const productId = order.productId;
                const product = await productModel.findOne({ _id: productId });
                if (product) {
                    const populatedOrder = {
                        productName: order.productname,
                        amount: order.amount,
                        image: product.images[0]
                    };
                    populatedOrders.push(populatedOrder);
                }
            }

            const response = {
                user: {
                    username: user.name,
                    useremail: user.email,
                },
                orders: populatedOrders, // Use the populated orders array
            };
            return res.render("frontend/profile",{data:response});
            console.log(response);
            res.send(response);
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    };
}

export default profileController;
