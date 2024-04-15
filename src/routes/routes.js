import express from "express";
const router = express.Router();

import authRoutes from "../api/auth/index.js";

router.use("/auth", authRoutes);

export default router;
