import express from "express";
import protect from "../middlware/authMiddleware.js";
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
} from "../controller/resumeController.js";
import upload from "../config/multer.js";

const route = express.Router();

route.post("/create", protect, createResume);
route.put("/update", upload.single("image"), protect, updateResume);
route.delete("/delete/:resumeId", protect, deleteResume);
route.get("/get/:resumeId", protect, getResumeById);
route.get("/public/:resumeId", getPublicResumeById);

export default route;
