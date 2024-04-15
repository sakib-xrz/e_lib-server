import express from "express";
const authRoutes = express.Router();

authRoutes.post("/login", (_req, res) => {
  res.json("Login route");
});

authRoutes.post("/register", (_req, res) => {
  res.send("Register route");
});

export default authRoutes;
