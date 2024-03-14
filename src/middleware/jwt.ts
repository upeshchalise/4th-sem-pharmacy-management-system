import jwt, { Secret } from "jsonwebtoken";
require("dotenv").config();

export const generateAccessToken = (email: string) => {
  const payload = {
    email
  };

  const secret = process.env.SECRET_KEY as Secret;
  const option = { expiresIn: "1h" };

  return jwt.sign(payload, secret, option);
};

export const verifyAccessToken = (token: string) => {
  const secret = process.env.SECRET_KEY as Secret;

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, decoded };
  } catch (err) {
    return { success: false, error: err };
  }
};
