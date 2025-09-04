import {Router} from "express";
import multer from "multer";
import cloudinary from "../../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { createCategorySurvey, deleteCategorySurvey, updateCategorySurvey, createBanner, updateBanner, deleteBanner } from "../controllers/SurveyController.js";
import { otpVerify, RegisterUser, userLogin, resendOtp, AdminLogin } from "../controllers/UserController.js";


function getCurrentTimestamp() {
  const now = new Date();
  const YYYY = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, '0');
  const DD = String(now.getDate()).padStart(2, '0');
  const HH = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const SS = String(now.getSeconds()).padStart(2, '0');
  return `${YYYY}${MM}${DD}${HH}${mm}${SS}`;
}

const sanitizeFileName = (filename) => {
  return filename
    .replace(/\s+/g, "_")       // replace spaces with underscores
    .replace(/#/g, "")          // remove #
    .replace(/[^\w.-]/g, "");   // remove other special chars
};

// ✅ Allowed file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "text/csv",
    "image/jpeg",
    "image/jpg",
    "application/octet-stream",
    "image/svg+xml",
    "image/png",
    "image/svg",
    "video/mp4",
    "video/x-m4v",
    "application/pdf",
    "application/msword",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, MP4, PDF, DOC files are allowed"));
  }
};

// ✅ Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = file.mimetype.startsWith("video/")
      ? `${process.env.UPLOADS_PATH}/user/videos`
      : `${process.env.UPLOADS_PATH}/user/images`;
    return {
      folder,
      resource_type: "auto", // auto handles images/videos/docs
      public_id: `${sanitizeFileName(file.originalname.split(".")[0])}_${getCurrentTimestamp()}`, 
    };
  },
});

// ✅ Multer setup
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
});



const router=Router();


router.post("/create-category-survey", createCategorySurvey);
router.put("/update-category-survey", updateCategorySurvey);
router.delete("/delete-category-survey", deleteCategorySurvey);

router.post("/create-banner", createBanner);
router.put("/update-banner", updateBanner);
router.delete("/delete-baaner", deleteBanner);

router.post("/register", RegisterUser);
router.post("/user-login", userLogin);
router.post("/admin-login", AdminLogin);
router.post("/otp-verify", otpVerify);
router.post("/resend-otp", resendOtp);


export default router;