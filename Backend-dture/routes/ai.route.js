import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/ai-result", async (req, res) => {
  try {
    const { debates } = req.body;

    if (!debates || debates.length === 0) {
      return res.status(400).json({ message: "No debates provided" });
    }

    const prompt = debates.map((d, i) => `
Debate ${i + 1}:
Title: ${d.name}
Agree Votes: ${d.agree}
Disagree Votes: ${d.disagree}
`).join("\n");

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
Analyze each debate and return:
- Debate title
- Winner (AGREE or DISAGREE)
- One-line reason

${prompt}
`,
          },
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
