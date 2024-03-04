import Razorpay from "razorpay";
import Transaction from "../../model/frontend/orderModule.js";
import jwt from "jsonwebtoken";
import { connect } from "mongoose";
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

let savedTransactions = [];
const createOrder = async (req, res) => {
    //let savedTransactions = [];
    try {
        const token = req.cookies.frontoken;
        const Authuser = jwt.verify(token, process.env.JWT_Fortend_KEY);
        const userId = Authuser.userID;
        const { firstName, lastName, phone, email, address, city, zipCode, productname, amount,productId } = req.body;
      
        if (firstName && lastName && phone && email && address && city && zipCode && productname && userId) {
            const doc = new Transaction({
                firstName,
                lastName,
                phone,
                email,
                address,
                city,
                zipCode,
                productname,
                amount,
                status: 'pending',
                userId,
                productId,
            });

          const  savedTransaction = await doc.save();
          savedTransactions.push(savedTransaction._id);

            const options = {
                amount: amount*100,
                currency: 'INR',
                receipt: 'razorUser@gmail.com'
            };
         
            razorpayInstance.orders.create(options, async (err, order) => {
               if(err){
                console.log(err)
               }
                if (!err) {
                    const info = await Transaction.findByIdAndUpdate(savedTransaction._id, { $set: { orderId: order.id } }, { new: true });
                    if (info) {
                        return res.status(200).send({
                            success: true,
                            msg: 'Order Created',
                            order_id: order.id,
                            amount: amount,
                            key_id: RAZORPAY_ID_KEY,
                            product_name: productname,
                            contact:phone,
                            name:firstName,
                            email:email,
                        });
                    }
                } else {
                    return  res.status(400).send({ success: false, msg: 'Something went wrong!' });
                }
            });
        } else {
            const { paymentId } = req.body;
            if (paymentId) {
            const info = await Transaction.findByIdAndUpdate(savedTransactions[0], { $set: { transactionId: paymentId, status:"success" } }, { new: true });
            if(info){
                savedTransactions.shift();
                return res.status(200).send('Webhook received successfully');
            }
            }
        }
    } catch (error) {
        console.error('Error creating order:', error);
        return  res.status(500).json({
            success: false,
            msg: 'Something went wrong'
        });
    }
};


export default {createOrder};