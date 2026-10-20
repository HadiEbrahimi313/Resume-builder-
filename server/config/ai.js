import OpenAI from "openai";

const ai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
  
});

export default ai;
