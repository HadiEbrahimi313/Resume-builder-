import ai from "../config/ai.js";
import Resume from "../model/Resume.js";
import { resumePromt } from "../propmts/resumePrompt.js";

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: resumePromt.improve_summary,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: resumePromt.improve_job_description,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhancedContent = response.choices[0].message;
    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userPrompt = `extract data from this resume: ${resumeText}
    
    Provide data in the following JSON format with no additional text before or after:
    professional_summary: {
      type: String,
      default: "",
    },
    skills: [
      {
        type: String,
      },
    ],

    personal_info: {
      image: { type: String, default: "" },
      full_name: { type: String, default: "" },
      profession: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    experience: [
      {
        company: { type: String },
        position: { type: String },
        start_date: { type: String },
        end_date: { type: String },
        description: { type: String },
        is_current: { type: Boolean },
      },
    ],

    project: [
      {
        name: { type: String },
        type: { type: String },
        description: { type: String },
      },
    ],

    education: [
      {
        institution: { type: String },
        degree: { type: String },
        field: { type: String },
        graduation_date: { type: String },
        gap: { type: String },
      },
    ],
    
    `;

    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: resumePromt.upload_resume_prompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message;
    const parsedData = JSON.parse(extractedData);
    const newResume = await Resume.create({ userId, title, ...parsedData });
    return res.status(200).json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
