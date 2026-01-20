import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


const router = express.Router();

router.post("/ai-result", async (req, res) => {
  try {
    const { debate } = req.body;

    if (!debate ) {
      return res.status(400).json({ message: "No debates provided" });
    }

    const prompt = `
Debate ${1}:
Title: ${debate.name}
Agree Votes: ${debate.agree}
Disagree Votes: ${debate.disagree}
Created By : ${debate.user}
` 

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an AI judge that decides debate winners.",
          },
          {
  role: "user",
  content: `
You are an AI analyst summarizing the final result of ended debates
for a mobile app audience.

For EACH debate:
- Write a clean, friendly AI Generated Summary
- Mention total participants
- Explain what AGREE supporters think
- Explain what DISAGREE critics think
- Give a neutral world perspective
- End with "World’s Verdict" based on vote ratio

Rules:
- Use emojis
- Keep it readable like a social media post
- Do NOT use markdown headings
- Do NOT mention numbers in brackets
- Sound confident and neutral

Debate Data:
${prompt}
`
}
,
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Debate App",
        },
      }
    );

    res.json({
      result: response.data.choices[0].message.content,
    });

  } catch (error) {
    console.error("OPENROUTER ERROR ❌:", error.response?.data || error.message);
    res.status(500).json({ message: "AI generation failed" });
  }
});

export default router;
