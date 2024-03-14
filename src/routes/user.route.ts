import express from "express";
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
router.get("user/:id", getUserById);
router.post("/login", login);

router.get("/me", authenticateUser, LoggedInUser);

module.exports = router;
