import express from "express";

import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  Register,
} from "../controllers/users.js";

import { userVerify } from "../middleware/userVerify.js";

const router = express.Router();

router.get("/users", userVerify, getUsers);
router.get("/users/:id", userVerify, getUserById);
router.patch("/users/:id", userVerify, updateUser);
router.post("/users", Register);
router.delete("/users/:id", userVerify, deleteUser);

export default router;
