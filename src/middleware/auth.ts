import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, generateAccessToken } from "./jwt";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    try {
      const user = verifyAccessToken(token);
      req.user = user;
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    res.status(401).json({ error: "Token not provided" });
  }
};