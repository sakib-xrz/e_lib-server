import User from "../model/User.js";
import cloudinary from "../utils/cloudinary.js";

const handleGetUser = async (user) => {
  const { _id } = user;
  const userData = await User.findById(_id).select("-password -__v");
  return userData;
};

const handleUpdateProfilePicture = async (user, file) => {
  const { _id } = user;

  const targetUser = await User.findById(_id);

  if (!targetUser) {
    throw new Error("User not found");
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

  return updatedUser;
};

const MeService = {
  handleGetUser,
  handleUpdateProfilePicture,
};

export default MeService;
