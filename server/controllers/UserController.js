import bcrypt from "bcrypt";
import dotenv from "dotenv";
import generatedToken from "../utils/generateToken.js";
import asyncHandler from "../utils/AsyncHandler.js";
import { User, Role, Otpverify } from "../model/index.js"
import { SucessPassword } from "../utils/constanse.js";
import { AppError } from "../utils/ApiErrors.js";
import { handleOtpProcess } from "../utils/SendOtp.js";
import { successResponse } from "../utils/responseHandler.js";


export const userLogin = asyncHandler(async (req, res) => {
  const { email, password, fcm_token = null } = req.body;
  if (!email || !password) {
    throw new AppError("Email and password are required.", 404);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email format.", 404);
  }

  const user = await User.findOne({ where: { email, profile_complete: 'COMPLETE', role_id: 2 } });
  if (!user) {
    throw new AppError("Invalid email or password.", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password.", 404);
  }
  user.fcm_token = fcm_token;
  await user.save();
  const { accessToken } = await generatedToken({
    userId: user.id
  });
  const userSafe = { ...user.get({ plain: true }) };
  delete userSafe.password;
   
  const response = {
    userSafe,
    accessToken,
  };

  return successResponse(res, "Login successfule!", response);
});

export const RegisterUser = asyncHandler(async (req, res) => {
  const { email, password, fcm_token = null } = req.body;
  const emailLower = email.toLowerCase();

  if (!email || !password) {
    throw new AppError(
      "Email, password, and confirm password are required.",
      404
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  let user = await User.findOne({ where: { email: emailLower } });
  if (user) {
    throw new AppError("Sorry! your account already exists, Plz do login!", 400);
  }
  let baseUserName = email.split('@')[0].toLowerCase();
  let uniqueUserName = baseUserName;
  let count = 1;

  // Loop to ensure uniqueness
  while (await User.findOne({ where: { user_name: uniqueUserName } })) {
    uniqueUserName = `${baseUserName}${count}`;
    count++;
  }
  const userinfo = await User.create({
      password: hashedPassword,
      login_from: "local",
      profile_picture : "https://ik.imagekit.io/runtime/uploads_images_thumb-1920-1350882_20250805092622.png",
      profile_complete: "PENDING",
      fcm_token: fcm_token,
      user_name: uniqueUserName, 
      email: email,
      role_id: 2
    });
  
  await handleOtpProcess(userinfo, res);

  return successResponse(res, "OTP sent to email successfully. Please check your inbox.", );
});

export const logoutUser = asyncHandler(async (req, res) => {
        const ExistingUser = await User.findOne({where: { id: req.user.id }});
        ExistingUser.fcm_token = null;
        await ExistingUser.save();
        return successResponse(res, "Logout successful.!", );
});

//! For refresh Fcm Token
export const fcmTokenMobile = asyncHandler(async (req, res) => {
    const { fcm_token } = req.query;
    if(!fcm_token) throw new AppError("Fcm token is required!", 404);
    await User.update({ fcm_token: fcm_token }, { where: { id: req.user.id } });
    return successResponse(res, "Fcm Token save properly!",)
});

export const passwordResetRequest = asyncHandler(async (req, res) => {
 const { email } = req.body;
  if (!email) {
    throw new AppError("Email is required!.", 404);
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError("User not registered.", 404);
  }

  if (user.profile_complete !== 'COMPLETE') {
    throw new AppError("Please complete registration first.", 404);
  }

  await handleOtpProcess(user, res);
});

export const otpVerify = asyncHandler(async (req, res) => {
  const { otp, email, type="registration" } = req.body;
  if (!otp || !email) {
    throw new AppError("Email and Otp are required!.", 404);
  }
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw new AppError("User Not Register..", 404);
  }
  const OtpExisting = await Otpverify.findOne({
    where: {
      email: email,
      type: type
    },
  });
  if (!OtpExisting) {
    throw new AppError("User Not Register..", 404);
  }
  const expires_at = OtpExisting.expires_at;
  if (new Date() > expires_at) {
    await Otpverify.destroy({ where: { email: OtpExisting.email, type: type } });
    throw new AppError("OTP has expired. Please request a new one.", 404);
  }
  if (otp === OtpExisting.otp) {
    await Otpverify.destroy({ where: { email: OtpExisting.email, type: type } });
    if(type === 'registration'){
    await user.update({
      profile_complete: "COMPLETE",
    });
    const { accessToken } = await generatedToken({
    userId: user.id
  });
    const userSafe = { ...user.get({ plain: true }) };
    delete userSafe.password;

    const response = {
      userSafe,
      accessToken,
    };
    return successResponse(res, "User register successfully", response);
    }
    return successResponse(res, "Otp successfully verify");
  } else {
    throw new AppError("Sorry! Otp not match.", 404);
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { password, email } = req.body;

  if (!password) {
    throw new AppError("Password is required.", 404);
  }

    const user = await User.findOne({ where: { email: email, profile_complete: "COMPLETE"  } });
    if (!user) {
      throw new AppError("Email is not registered with LMS.", 404);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    const name = user.name;
    const subject = "Password Reset Complete – You’re Good to Go!";
    const htmlContent = await SucessPassword(name);
    try {
      await sendEmails(user.email.trim(), subject, htmlContent);
     // console.log(`Email sent to ${user.email}`);
    } catch (emailError) {
      console.error(
        ` Failed to send email to ${user.email}: ${emailError.message}`
      );
    }

    return successResponse(res, "Pasword has been reset successfully", {});
  
});

export const resendOtp = asyncHandler( async ( req, res ) =>{
    const { email } = req.body;
     const user = await User.findOne({ where: { email: email } });
    await handleOtpProcess(user, res);
    return successResponse(res, "OTP sent to email successfully. Please check your inbox.", );
});

export const AdminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError("Email and password are required.", 404);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email format.", 404);
  }

  const user = await User.findOne({ where: { email, profile_complete: 'COMPLETE', role_id: 1 } });
  if (!user) {
    throw new AppError("Invalid email or password.", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password.", 404);
  }
  const { accessToken } = await generatedToken({
    userId: user.id
  });
  const userSafe = { ...user.get({ plain: true }) };
  delete userSafe.password;
   
  const response = {
    userSafe,
    accessToken,
  };

  return successResponse(res, "Login successfule!", response);
});
