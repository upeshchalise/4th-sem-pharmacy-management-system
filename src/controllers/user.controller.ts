import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const prisma = new PrismaClient();

export const getAllUser = (req: Request, res: Response) => {
  res.send("This is the all users route");
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
