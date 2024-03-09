import express from "express";
import {
  createUser,
  getAllUser,
  getUserById,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/allUser", getAllUser);
router.post("/createUser", createUser);
router.get("/:id", getUserById);

module.exports = router;
