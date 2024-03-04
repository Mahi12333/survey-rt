import { Router } from "express";
import UserController from "../../controllers/backend/user/userController.js";
import checkUserAuth from "../../middleware/backend/userMiddleware.js";
import AuthorizedUser from "../../middleware/backend/authorization.js";
import CheckAdminPermission from "../../middleware/backend/permission.js";
import UserroleController from "../../controllers/backend/user/userroleController.js";
import AllviewController from "../../controllers/backend/user/viewController.js";
import SearchController from "../../controllers/backend/user/SearchController.js";
import Allupdated_Controller from "../../controllers/backend/user/updatedController.js";
import UpdateMethodController from "../../controllers/backend/user/updateMethodController.js";
import User_DeleteController from "../../controllers/backend/user/deleteController.js";
import categoryController from "../../controllers/backend/category/createController.js";
import categoryviewController from "../../controllers/backend/category/viewController.js";
import categoryDelete from "../../controllers/backend/category/deleteController.js";
import subCateController from "../../controllers/backend/subcategory/createController.js";
import subcategoryviewController from "../../controllers/backend/subcategory/viewController.js";
import subcaegory_updated from "../../controllers/backend/subcategory/updatedController.js";
import subcategoryDelete from "../../controllers/backend/subcategory/deleteController.js";
import ProdutCreateController from "../../controllers/backend/product/createController.js";
import uplodeds  from "../../middleware/backend/file_multer.js";
import productviewController from "../../controllers/backend/product/viewController.js";
import productDelete from "../../controllers/backend/product/deleteController.js";
import product_updated from "../../controllers/backend/product/updateController.js";
import paymentController from "../../controllers/backend/order/paymentController.js";
const router=Router();

// !ROute Level Middleware - To Protect Route
router.use('/loggeduser',checkUserAuth);
router.use('/changepassword',checkUserAuth);
//router.use("/view-user",checkUserAuth);


//!public route
router.post('/register', UserController.userRegistration);
//router.post('/sucess-regis/:id/:token', UserController.varifyRegistration);
router.post('/login', UserController.userLogin);
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail);
router.get('/reset-password/:id/:token', UserController.getallowPassreset);
router.post('/reset-password/:id/:token', UserController.userPasswordReset);
router.get('/ui-user',UserroleController.fecthPermission);
router.post('/create-user',UserroleController.createuserRole);
router.get('/verifyUsermail/:token',UserroleController.verifyUserMail);
router.post('/verifyUsermail/:token',UserroleController.responseVerifyMail);
router.post('/search', checkUserAuth,SearchController.userSearch);
router.get('/updated-user/:id', checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'),CheckAdminPermission('update'), Allupdated_Controller.updted_User);
router.put('/updated-user/:userId',checkUserAuth, UpdateMethodController.user_update);//problem
router.delete('/delete-user/:userId',checkUserAuth, User_DeleteController.user_delete);
router.post('/add_category',checkUserAuth,categoryController.create_category);
router.delete('/delete-category/:cate_Id',checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'),CheckAdminPermission('delete'),categoryDelete.deleteCategory);
router.get('/list-category',subCateController.fetchCategory);
router.post('/create-subcategory',checkUserAuth,subCateController.createSubcategory);
router.get('/updated-subcategory/:id',checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'),CheckAdminPermission('update'),subcaegory_updated.updted_subcate);
router.put('/updated-subcategory/:id',checkUserAuth, subcaegory_updated.updated_process);
router.delete('/delete-subcategory/:subcate_Id',checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'),CheckAdminPermission('delete'),subcategoryDelete.deletesubCategory);
router.get('/product-category',ProdutCreateController.product_category);
router.get('/product-subcategory/:id',ProdutCreateController.product_subcategory);
router.post('/create-product', uplodeds.array('images',5),ProdutCreateController.product_create);
router.get('/updated-product/:id',checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'),CheckAdminPermission('update'),product_updated.updted_product);
router.put('/updated-product/:id',checkUserAuth, uplodeds.array('images',5),product_updated.updated_process);
router.delete('/delete-product/:pro_Id',checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'),CheckAdminPermission('delete'),productDelete.deleteproduct);
//!Public Route

//!protect route
router.get('/loggeduser', UserController.loggedUser);
router.post('/changepassword', UserController.changeUserPassword);
router.get("/view-user",checkUserAuth, AllviewController.userView);
router.get("/category-view",checkUserAuth,categoryviewController.categoryView);
router.get("/subcategory-view",checkUserAuth,subcategoryviewController.subcategoryView);
router.get("/product-view",productviewController.productView);
router.get('/orderDetails',checkUserAuth,paymentController.payment);
export default router;