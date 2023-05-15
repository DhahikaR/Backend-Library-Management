import express from "express";

import { Login, Me, Logout } from "../controllers/authorization.js";

const router = express.Router();

router.post("/Login", Login);
router.get("/Me", Me);
router.delete("/Logout", Logout);

export default router;
