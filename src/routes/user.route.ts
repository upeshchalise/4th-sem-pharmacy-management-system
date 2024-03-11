import express, { NextFunction } from "express";
import {
  LoggedInUser,
  createUser,
  getAllUser,
  getUserById,
  login,
} from "../controllers/user.controller";
import { authenticateUser } from "../middleware/auth";

const router = express.Router();

router.get("/allUser", getAllUser);
router.post("/createUser", createUser);
router.get("/:id", getUserById);
router.post("/login", login);
router.get("/checkAuth", authenticateUser,LoggedInUser);

module.exports = router;
