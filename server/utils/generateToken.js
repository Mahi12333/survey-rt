import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



const generatedToken = async ({ userId, userAgent, ipAddress }) => {
  //const token = jwt.sign({ userId, sessionId }, JWT_SECRET, { expiresIn: '1h' });
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "60d" }
  );

  return { accessToken };
};




export default generatedToken;



