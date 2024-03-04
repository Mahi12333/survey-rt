import express from "express";
import bodyparser from "body-parser";
import { fileURLToPath } from "url";
import {dirname, resolve } from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import session from "express-session";


dotenv.config({
    path:'./.env',
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();  
app.use(cors());  //Enable CORS for all routes
// log requests
//app.use(morgan('tiny'));

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieParser());

app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));




// set view engine
app.set("view engine", "ejs");
//app.set("views",templatePath);
app.use('/', express.static(resolve(__dirname, "../public/")));
// fortend multer 
app.use('/frontend/photo', express.static(resolve(__dirname, "../public/user/photo/")));

//! load routers for frontend
import HomeRouter from "./routes/frontend/router.js";
app.use('/', HomeRouter);

//!api for frontend
import apiRouter from "./routes/frontend/api.js";
app.use('/api', apiRouter); 


//! load assets For frontend 
app.use('/backend/assets', express.static(resolve(__dirname, "../public_backend/assets/")));

// For Multter
app.use('/backend/photo', express.static(resolve(__dirname, "../public_backend/assets/photo/")));
// app.use('/backend/temp', express.static('../temp/photo/'));
//app.use('/temp', express.static(resolve(__filename, "../temp/photo/")));
// const tempFolderPath = path.resolve(__dirname, '../temp/photo/');
// app.use('/backend/temp', express.static(tempFolderPath));
// console.log(tempFolderPath);

//! load routers for backend
import BackendRoute from "./routes/backend/routes.js";
app.use('/backend/', BackendRoute);

//! load Api for backend
import backendApi from "./routes/backend/api.js";
app.use('/api/user',backendApi);


app.get("/logout", (req, res) => {
    res.cookie("token", "", { maxAge: "1" })
    res.redirect("/backend/login")
  })

  app.get("/forlogout", (req, res) => {
    res.cookie("frontoken", "", { maxAge: "1" });
    res.clearCookie("cartItems");
    res.redirect("/")
  })

//app is export from app.js
export { app };
