// import Transaction from "../../model/frontend/orderModule.js";
// import userModel from "../../model/frontend/userModel.js";

// class PaymentController {
//     static async payment(req, res) {
//         try {
//             const page=parseInt(req.query.page);
//             const limit=parseInt(req.query.limit);  
//            const startIndex = (page - 1) * limit
//            const lastIndex = (page) * limit
//             const transitions = await Transaction.find({})           
//             if (!transitions || transitions.length === 0) {
//                 return res.json({ message: "No transactions found" });
//             }
//             const responseDataArray = await Promise.all(transitions.map(async (transition) => {      
//                const userIds=transition.userId;
//                const users = await userModel.find({ _id: { $in: userIds } });
//                   return {
//                     oderdetils:transition,
//                     users
//                    };        
//                 }));
//             const results = {}
//             results.totalEntries=responseDataArray.length;
//             results.pageCount=Math.ceil(responseDataArray.length/limit);
//             if (lastIndex < responseDataArray.length) {
//               results.next = {
//                 page: page + 1,
//               }
//             }
//             if (startIndex > 0) {
//               results.prev = {
//                 page: page - 1,
//               }
//             }
//           results.result = responseDataArray.slice(startIndex, lastIndex);
//           return  res.json(results);
//         } catch (error) {
//             res.status(500).json({ error: "Internal Server Error" });
//         }
//     };
// }

// export default PaymentController;
