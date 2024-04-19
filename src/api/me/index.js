import express from "express";
const meRoutes = express.Router();

import UserController from "../../controller/user.js";
import authGuard from "../../middleware/authGuard.js";

meRoutes.get("/", authGuard(), UserController.getUser);

export default meRoutes;
