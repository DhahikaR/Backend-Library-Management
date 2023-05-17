import express from "express";

import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  Register,
} from "../controllers/users.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.patch("/users/:id", updateUser);
router.post("/users", Register);
router.delete("/users/:id", deleteUser);

export default router;
