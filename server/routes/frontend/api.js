import { Router } from "express";
import  homePage  from "../../controllers/frontend/HomeController.js";
import UserController from "../../controllers/frontend/Usercontroller.js";
import ImagesControler from "../../controllers/frontend/ImagesControler.js";
import Cate_SubController from "../../controllers/frontend/Cate_SubController.js";
import addtoCardController from "../../controllers/frontend/addtoCardController.js";
import carddetailsController from "../../controllers/frontend/carddetailsController.js";
import checkUserAuth from "../../middleware/frontend/userMiddleware.js";
import paypalController from "../../controllers/frontend/paypalController.js";
const {createOrder}=paypalController;
import uplodeds from "../../middleware/frontend/multer.js";
import profileController from "../../controllers/frontend/profileController.js";

const apiRouter = Router();


apiRouter.get('/homePage', homePage);
// apiRouter.get('/cartPage', cartPage);
apiRouter.post('/register', UserController.userRegistration);
apiRouter.post('/login', UserController.userLogin);
apiRouter.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail);
apiRouter.get('/reset-password/:id/:token', UserController.getallowPassreset);
apiRouter.post('/reset-password/:id/:token', UserController.userPasswordReset);
apiRouter.get('/allImages', ImagesControler.allimages);
apiRouter.get('/cate_subcate',Cate_SubController.category);
//apiRouter.get('/logout',UserController.logout);
apiRouter.post('/addTocart',checkUserAuth,addtoCardController.addToCart);
apiRouter.get('/addTocart',checkUserAuth,addtoCardController.getCardItem);
apiRouter.post('/cardProduct',carddetailsController.carddetails);
apiRouter.get('/single_product/:productId',checkUserAuth,carddetailsController.singleproductDetails);
apiRouter.get('/cardsingleProduct/:productId/:quantity',checkUserAuth,carddetailsController.singlecardDetails);
apiRouter.get('/singlecheckout/:productId/:quantity',checkUserAuth,carddetailsController.singlecheckout);
apiRouter.post('/payment',checkUserAuth,createOrder);
apiRouter.post('/userimageUpload',uplodeds.single("image"),UserController.userimageUpload);
//apiRouter.get('/fetchprofile',profileController.profile);
apiRouter.get('/profile',checkUserAuth,profileController.profile);
apiRouter.post('/changepassword',checkUserAuth, UserController.changeUserPassword);



export default apiRouter;
