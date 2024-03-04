import { Router } from "express";
import { homeRoute,cartRoute,categoryRoute,checkoutRoute,confirmationRoute,contactRoute,elementsRoute,loginRoute,singleblogRoute,trackingRoute,registrationRoute,forgotRoute,sendemailRouter} from "../../service/frontend/rander.js";
import checkUserAuth from "../../middleware/frontend/userMiddleware.js";
import categoryAuth from "../../middleware/frontend/categoryAuth.js";
//cartRoute

// console.log('Router is being set up!'); 

const router = Router();

//!route For Frontend

router.get('/', checkUserAuth,homeRoute);
router.get('/cart',checkUserAuth,cartRoute);
router.get('/category',checkUserAuth,categoryAuth,categoryRoute);
router.get('/checkout',checkUserAuth,checkoutRoute);
router.get('/confirmation',checkUserAuth,confirmationRoute);
router.get('/contact',contactRoute);
router.get('/elements',checkUserAuth,elementsRoute);
router.get('/login',loginRoute);
router.get('/singleblog',singleblogRoute);
router.get('/tracking',trackingRoute);
router.get('/registration',registrationRoute);
router.get('/forgot',forgotRoute);
router.get('/sendemail',sendemailRouter);



export default router;
