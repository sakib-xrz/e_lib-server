import express from "express";
const router = express.Router();

import authRoutes from "../api/auth/index.js";
import meRoutes from "../api/me/index.js";
import adminRoutes from "../api/admin/index.js";
import blogRoutes from "../api/blog/index.js";

router.use("/auth", authRoutes);
router.use("/me", meRoutes);
router.use("/admin", adminRoutes);
router.use("/blog", blogRoutes);

export default router;
