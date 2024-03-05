import express from "express";
import { createUser, getAllUser } from "../controllers/user.controller";

const router = express.Router();

router.get("/allUser", getAllUser);
router.post("/createUser", createUser);

module.exports = router;
