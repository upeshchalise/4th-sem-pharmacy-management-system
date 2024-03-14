import { Request, Response, NextFunction } from "express";
import { User } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "./jwt";

export interface AuthenticateUser extends Request {
  user?: any;
}

export const authenticateUser = async (
  req: AuthenticateUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  const result = verifyAccessToken(token);
  console.log("Decoded token payload:", result.decoded);

  if (!result.success) {
    return res.status(403).json({ message: "Invalid token" });
  }

  // if (typeof result.decoded === "string") {
  //   return res.status(403).json({ message: "Here is the error" });
  // }

  req.user = result.decoded; // Assuming result.data contains user information
  console.log(req.user, "req.user");
  next();
};

// function authenticateToken(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   const JWT_SECRET = process.env.SECRET_KEY as Secret;

//   if (!token) {
//     return res.sendStatus(401);
//   }

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403);
//     }
//     req["user"] = user;
//     next();
//   });
// }
