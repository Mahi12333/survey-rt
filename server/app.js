import express from "express";
import bodyparser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import backendWebRoute from "./routes/webroutes.js";   // for rendering EJS pages
import backendApi from "./routes/route.js";            // for API endpoints
import { connectDB} from "../config/database/connection.js";
import middleware from "i18next-http-middleware";
import i18n from "../config/i18n.js";
import { errorHandler, notFound } from "./utils/ErrorHandler.js";
import { syncDB } from "./utils/SeedData.js";
import {sequelize} from '../config/database/connection.js';


dotenv.config({ path: "./.env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// parse request body
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(middleware.handle(i18n));

connectDB();

const allowedOrigins = 
    [
        'http://localhost:8080',
        'http://localhost:3000',
        'http://localhost:4000'
    ]

// syncDB();

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
}));

// set view engine
// app.set('views', './views');
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
console.log("__dirname:", __dirname);
console.log("Views directory:", path.join(__dirname, "views"));


// static folders
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/.well-known", express.static(path.join(__dirname, ".well-known")));
app.use("/assets", express.static(path.join(__dirname, "../public_backend/assets/")));
app.use("/photo", express.static(path.join(__dirname, "../public_backend/assets/photo/")));

// Optional: silence requests you don’t care about
app.get("*.map", (_req, res) => res.status(204).end());          // ignore source maps
app.get("/.well-known/*", (_req, res) => res.status(204).end()); // ignore unknown .well-known

// Web pages
app.use("/", backendWebRoute);

// Api routes
app.use("/v1/api/user", backendApi);

// 404 + error handler must be last
app.use(notFound);
app.use(errorHandler);

sequelize.sync()
// await sequelize.sync({ force: true }); // ⚠️ Drops all tables and recreates

app.listen(process.env.PORT || 4000 , () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
        console.log(`Server is running at http://localhost:${process.env.PORT}`);
    })



