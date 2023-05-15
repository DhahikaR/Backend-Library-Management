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
router.get("/users", getUserById);
router.patch("/users", updateUser);
router.delete("/users", deleteUser);
router.post("/users", Register);

export default router;
