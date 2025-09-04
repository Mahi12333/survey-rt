
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
  //console.log(user)
  let otpUser = await Otpverify.findOne({ where: { email: user.email } });

  // Remove expired OTP
  if (otpUser && new Date() > otpUser.expires_at) {
    await Otpverify.destroy({ where: { email: user.email } });
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
      // return successResponse(res, 'OTP sent to email successfully. Please check your inbox.', {});
      return true
    } else {
      throw new AppError('Failed to send OTP.', 404);
    }
  } else {
    // Generate new OTP and store
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 2 * 60000); // expires in 1 minute
    const emailSent = await sendOtpEmail(otp, user.email);

    if (emailSent) {
      const otpSend = await Otpverify.create({
        email: user.email,
        otp,
        expires_at: expiresAt,
      });

      const responseData = otpSend.get({ plain: true });
      delete responseData.otp;
      return true
      //return successResponse(res, 'OTP sent to email successfully. Please check your inbox.', {});
    } else {
      throw new AppError('Failed to send OTP.', 404);
    }
  }
};


export {
    handleOtpProcess,
}