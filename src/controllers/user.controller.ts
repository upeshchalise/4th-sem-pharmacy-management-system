import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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
    res.status(404).json({ message: "user not found" });
  }
  res.status(200).json({ user: userById });
};
