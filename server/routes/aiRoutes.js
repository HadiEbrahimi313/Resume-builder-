import express from "express";
import protect from "../middlware/authMiddleware.js";
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from "../controller/aiController.js";

const route = express.Router();

route.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);
route.post("/enhance-job-desc", protect, enhanceJobDescription);

route.post("/upload-resume", protect, uploadResume);

export default route;
