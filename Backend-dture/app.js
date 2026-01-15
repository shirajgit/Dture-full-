import cors from "cors";
import express from "express";
import mainRouter from "./routes/debate.route.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";  

dotenv.config();
const app = express();

connectDB();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.use("/", mainRouter);
app.use("/user", userRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});