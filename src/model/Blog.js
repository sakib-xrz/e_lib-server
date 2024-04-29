import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    content: {
      type: String,
      default: "",
      required: true,
    },
    banner: {
      type: String,
      default: "",
      required: true,
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
      },
      profile_picture: {
        type: String,
      },
    },
    like_count: {
      type: Number,
      default: 0,
    },
    comment_count: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["in_review", "published", "unpublished"],
      default: "in_review",
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
