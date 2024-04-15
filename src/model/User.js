import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      enum: ["user", "author", "admin"],
      default: "user",
      required: true,
    },
    profile_picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dgf7oj85d/image/upload/v1713201314/placeholder/user_placeholder_imcsu4.jpg",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
