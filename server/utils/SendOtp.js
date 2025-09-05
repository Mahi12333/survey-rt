
import { htmlContent_otp } from "./constanse.js";
import { sendMailOTP } from "../../config/sendEmail.js";
import dotenv from "dotenv";
import { Otpverify } from "../model/index.js"
import { AppError } from "../utils/ApiErrors.js";
import { successResponse } from "../utils/responseHandler.js";
dotenv.config();


export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const handleOtpProcess = async (user, res) => {
  // Find OTP by email
  let otpUser = await Otpverify.findOne({ email: user.email });

  // Remove expired OTP
  if (otpUser && new Date() > otpUser.expires_at) {
    await Otpverify.deleteOne({ email: user.email });  // ✅ Mongoose delete
    otpUser = null;
  }

  // Function to send the OTP email
  const sendOtpEmail = async (otp, recipientEmail) => {
    const subject = "Runtime SURVEY OTP Verification";
    const htmlContent = await htmlContent_otp(otp);

    try {
      await sendMailOTP(recipientEmail.trim(), subject, htmlContent);
      console.log(`✅ Email sent to ${recipientEmail}`);
      return true;
    } catch (emailError) {
      console.error(`❌ Failed to send email to ${recipientEmail}: ${emailError.message}`);
      return false;
    }
  };

  // If OTP already exists and is still valid, resend it
  if (otpUser) {
    const { otp, email } = otpUser;
    const emailSent = await sendOtpEmail(otp, email);

    if (emailSent) {
      return true;
    } else {
      throw new AppError("Failed to send OTP.", 404);
    }
  } else {
    // Generate new OTP and store
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 2 * 60000); // expires in 2 mins
    const emailSent = await sendOtpEmail(otp, user.email);

    if (emailSent) {
      await Otpverify.create({
        email: user.email,
        otp,
        expires_at: expiresAt,
      });
      return true;
    } else {
      throw new AppError("Failed to send OTP.", 404);
    }
  }
};



export {
    handleOtpProcess,
}