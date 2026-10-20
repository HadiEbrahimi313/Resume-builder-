import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("Root route reached");
  res.send("Server is live...");
});

app.listen(3001, "127.0.0.1", () => {
  console.log("Test server running on port 3001");
});