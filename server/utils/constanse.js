import fs from "fs/promises";
import path from "path";

export const ROLE_NAMES = {
  ADMIN: 'Admin',
  USER: 'User'
};



export function getBrowserName(userAgent) {
  if (!userAgent || typeof userAgent !== 'string') return 'Unknown';

  const ua = userAgent.toLowerCase();

  if (ua.includes('edg')) return 'Edge'; // must be checked before Chrome
  if (ua.includes('opr') || ua.includes('opera')) return 'Opera'; // before Chrome
  if (ua.includes('chrome') && !ua.includes('edg') && !ua.includes('opr')) return 'Chrome';
  if (ua.includes('safari') && !ua.includes('chrome')) return 'Safari'; // exclude Chrome
  if (ua.includes('firefox')) return 'Firefox';
  if (ua.includes('msie') || ua.includes('trident')) return 'Internet Explorer';

  return 'Unknown';
}


export const htmlContent_otp = async (otp) => {
    return `<!Doctype html>
                <html>
                <head></head>
                <body>
                <h1>OTP Verification</h1>
                    <h1><strong>${otp}</strong></h1>
                </body>
                </html>`
}

export const SucessPassword = async (name) => {
    return `<!Doctype html>
                <html>
                <head></head>
                <body>
                    <h1><strong>Hi, ${name} password successfully Change.</strong></h1>
                </body>
                </html>`
}
