import User from "../model/User.js";

const handleGetUser = async (user) => {
  const { _id } = user;
  const userData = await User.findById(_id).select("-password -__v");
  return userData;
};

const MeService = {
  handleGetUser,
};

export default MeService;
