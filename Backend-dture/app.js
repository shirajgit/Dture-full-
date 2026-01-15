import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import debateSchema from "./models/debate.model.js";
 
const app = express();
const port = 3000;  

  
   connectDB();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.post("/create", async (req, res) => {
  try {
    const { name, description, image, duration, id } = req.body;

    const debate =  await debateSchema.create({
      id,
  name,
  description,
  image,
  duration
   });

    return res.status(201).json({
      message: "Debate created successfully",
      debate,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error creating debate",
      error: err.message,
    });
  }
});

 

app.get("/debates", async (req, res) => {
  try {
    const debates = await debateSchema.find();

    return res.status(200).json({
      success: true,
      debates,
    });
  } catch (err) {
    console.error("GET /debates error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});





app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});