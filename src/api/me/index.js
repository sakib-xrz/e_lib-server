import express from "express";
const meRoutes = express.Router();

import UserController from "../../controller/user.js";
import authGuard from "../../middleware/authGuard.js";
import uploader from "../../middleware/uploader.js";

meRoutes.get("/", authGuard(), UserController.getUser);

meRoutes.patch("/change-password", authGuard(), UserController.changePassword);

meRoutes.patch(
  "/profile-picture",
  authGuard(),
  uploader.single("profile_picture"),
  UserController.updateProfilePicture
);

export default meRoutes;
