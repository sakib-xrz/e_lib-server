import fs from "node:fs";
import bcrypt from "bcrypt";

import cloudinary from "../utils/cloudinary.js";
import ApiError from "../error/ApiError.js";

import User from "../model/User.js";

const handleGetUser = async (user) => {
  const { _id } = user;
  const userData = await User.findById(_id).select("-password -__v");
  return userData;
};

const handleUpdateUser = async (userId, updatedUserData) => {
  const targetedUser = await User.findById(userId);

  if (!targetedUser) {
    throw new ApiError(404, "User not found");
  }

  if (Object.keys(updatedUserData).includes("email", "profile_picture")) {
    delete updatedUserData.email;
    delete updatedUserData.profile_picture;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
    new: true,
  }).select("-password -__v");

  return updatedUser;
};

const handleChangePassword = async (user, currentPassword, newPassword) => {
  const { _id } = user;

  const targetUser = await User.findById(_id);

  if (!targetUser) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordMatch = await bcrypt.compare(
    currentPassword,
    targetUser.password
  );

  if (!isPasswordMatch) {
    throw new ApiError(400, "Incorrect current password");
  }

  if (currentPassword === newPassword) {
    throw new ApiError(400, "Password must be different");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      password: hashedNewPassword,
    },
    {
      new: true,
    }
  ).select("-password -__v");

  return updatedUser;
};

const handleUpdateProfilePicture = async (user, file) => {
  const { _id } = user;

  const targetUser = await User.findById(_id);

  if (!targetUser) {
    throw new ApiError(404, "User not found");
  }

  const date = new Date();
  const today = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const filePath = file.path;
  const fileName = `${today}-${file.originalname}`;
  const type = file.mimetype;

  const uploadResult = await cloudinary.uploader.upload(filePath, {
    folder: "profile-pictures/",
    filename_override: fileName,
    format: type.split("/").at(-1),
    public_id: _id,
    overwrite: true,
    invalidate: true,
  });

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      profile_picture: uploadResult.secure_url,
    },
    {
      new: true,
    }
  ).select("-password -__v");

  await fs.promises.unlink(filePath);

  return updatedUser;
};

const MeService = {
  handleGetUser,
  handleUpdateUser,
  handleChangePassword,
  handleUpdateProfilePicture,
};

export default MeService;
