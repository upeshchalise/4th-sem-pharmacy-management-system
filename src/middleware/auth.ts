import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, generateAccessToken } from "./jwt";
import { User } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../controllers/user.controller";

export interface AuthenticateUser extends Request {
  user?: User | JwtPayload;
}

export const authenticateUser = async (
  req: AuthenticateUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // if (token) {
  //   try {
  //     const user = verifyAccessToken(token);
  //     res.locals.user = user;
  //     // req.user = user;
  //     return next();
  //   } catch (error) {
  //     res.status(401).json({ message: "Invalid token", token });
  //   }
  // } else {
  //   res.status(401).json({ message: "Token not provided", token });
  // }

  if (!token) {
    return res.sendStatus(401).json({ message: "unauthenticated" });
  }

  const result = verifyAccessToken(token);

  if (!result.success) {
    return res.status(403).json({ message: result.error });
  }

  req.user = result;
  next();
};
