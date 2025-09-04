import { Router } from "express";
import { backhomePageRoute, backloginPageRoute } from "../service/rander.js";
 console.log('backhomeRoute route is called!');

const router=Router();

// Admin Dashboard
router.get("/", backhomePageRoute);
router.get("/login", backloginPageRoute)


export default router;