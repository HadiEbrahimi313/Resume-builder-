import express from "express";
import {
  getUserById,
  getUserResume,
  loginUser,
  registerUser,
} from "../controller/userController.js";
import protect from "../middlware/authMiddleware.js";

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/data", protect, getUserById);
route.get("/resumes", protect, getUserResume);

export default route;
