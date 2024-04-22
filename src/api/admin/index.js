import express from "express";

import authGuard from "../../middleware/authGuard.js";
import UserController from "../../controller/user.js";
import { role } from "../../config/keyChain.js";

const adminRoutes = express.Router();

adminRoutes.patch(
  "/user/:id",
  authGuard(role.ADMIN),
  UserController.updateUser
);

export default adminRoutes;
