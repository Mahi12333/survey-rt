import {Router} from "express";
import { backhomeRoute,backproductRoute,backuserRoute,backtablesRoute,backloginRoute,backregisterRoute,sendEmailroute,backchangePassRoute,add_userRoute,user_tableRoute,add_category,category_tableRoute,subcategoryRoute,subcategoryTableRoute,add_product} from "../../service/backend/rander.js";
import checkUserAuth from "../../middleware/backend/userMiddleware.js";
import AuthorizedUser from "../../middleware/backend/authorization.js";
import CheckAdminPermission from "../../middleware/backend/permission.js";
import caegory_updated from "../../controllers/backend/category/updatedController.js";

console.log('Router is being sets up!'); 
const router=Router();
//!public route
router.get('/login', backloginRoute);
router.get('/register',backregisterRoute);
router.get('/send_mail_resetpass',sendEmailroute)
// router.get('/sucssregister',backsucssregisterRoute);
//router.get('/forgets',backforgetRoute);
router.get('/changePassword',backchangePassRoute);

//private route
//! Use the authMiddleware for the entire backend route
router.get('/', checkUserAuth,AuthorizedUser('admin'),backhomeRoute);
router.get('/user', backuserRoute);
router.get('/tables', backtablesRoute);
router.use('/add-user', checkUserAuth,AuthorizedUser('admin'),add_userRoute);
router.use('/user-table', checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'), user_tableRoute);
router.use('/add-category',checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'),CheckAdminPermission('add'),add_category);
router.use('/category-table',checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'),CheckAdminPermission('view'),category_tableRoute);
//router.use('/updated-category',updated_category);
router.use('/add-subcategory',checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'),CheckAdminPermission('add'),subcategoryRoute);
router.use('/subcategory-table',checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'),CheckAdminPermission('view'),subcategoryTableRoute)
router.get('/product-table',checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'),CheckAdminPermission('view'), backproductRoute);
router.use('/add-product',checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'),CheckAdminPermission('add'),add_product);


//!Api
router.get('/updated-category/:id',checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'),CheckAdminPermission('update'),caegory_updated.updted_cate);
router.post('/category-updated',checkUserAuth,AuthorizedUser('admin','subadmin','superadmin'),caegory_updated.updated_processController);

export default router;