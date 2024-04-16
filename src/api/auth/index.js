import express from "express";
const authRoutes = express.Router();

import AuthController from "../../controller/auth.js";

authRoutes.post("/register", AuthController.register);

authRoutes.post("/login", AuthController.login);

export default authRoutes;
