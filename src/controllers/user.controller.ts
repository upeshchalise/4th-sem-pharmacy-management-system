import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../middleware/jwt";
import { AuthenticateUser } from "../middleware/auth";

export const prisma = new PrismaClient();

export const getAllUser = async (req: Request, res: Response) => {
  const allUsers = await prisma.user.findMany();
  res.status(200).json({ users: allUsers });
};

export const createUser = async (req: Request, res: Response) => {
  const { email, first_name, last_name, password } = req.body;
  if (!email || !first_name || !last_name || !password) {
    res.status(400).json({ message: "All fields are required" });
  }
  const registeredEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (registeredEmail) {
    res.status(400).json({ message: "Email already taken" });
  }

  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = await prisma.user.create({
    data: {
      email,
      first_name,
      last_name,
      password: hashedPassword,
    },
  });
  res
    .status(200)
    .json({ message: "User Created SuccessFully", createdUser: newUser });
};

export const getUserById = async (req: Request, res: Response) => {
  // const { id }: string = req.params.id;
  const userById = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!userById) {
    return res.status(404).json({ message: "user not found" });
  }
  return res.status(200).json({ data: userById });
};

export const findUserByMail = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    return { message: user };
  } catch (error) {
    return { message: error };
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: { email },
  });
  // const user = await findUserByMail(email);

  if (user === null) {
    return { message: "data not found" };
  }

  const dbPassword = user.password;

  const matchPassword = await bcrypt.compare(password, dbPassword);
  if (!matchPassword) {
    res.status(400).json({ message: "Password didn't match" });
  }

  const token = generateAccessToken(email);
  // console.log(token, "token");
  console.log(token);
  res.status(200).json({ token, user });

  // const dbpassword = await user.data?.password;
};

export const LoggedInUser = async (
  req: AuthenticateUser,
  res: Response,
  next: NextFunction
) => {
  console.log("loggedInUser");
  // const user = req.headers.authorization?.split(" ")[1];
  // console.log(user, "from logged in user", req.user.email);

  res.json({ message: "you are authorized", user: req.user.email });
};
