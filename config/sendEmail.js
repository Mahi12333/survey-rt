import dotenv from 'dotenv';
dotenv.config({
    path:'./env',
})
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Admin Gmail ID
    pass: process.env.EMAIL_PASS, // Admin Gmail Password
  },
})


export const sendMailOTP = async ( to, subject, html ) => {
  //console.log("send otp", to, subject, html)
  try {
    const info = await transporter.sendMail({
      from: `"SURVEY-RT" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    // console.log("Message sent: %s", info.messageId);
    return { success: true };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error };
  }
};
