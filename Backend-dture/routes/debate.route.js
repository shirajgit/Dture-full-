 import cors from "cors";
 import express from "express";
 
 import debateSchema from "../models/debate.model.js";
  
 const  router = express();
 const port = 3000;  
 
 

 router.post("/create", async (req, res) => {
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


router.get("/debates", async (req, res) => {
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
 
 
 
router.post("/debates/:id/agree", async (req, res) => {
   const { text } = req.body;
 
   if (!text) {
     return res.status(400).json({ message: "Comment required" });
   }
 
   try {
     const debate = await Debate.findOne({ id: Number(req.params.id) });
 
     if (!debate) {
       return res.status(404).json({ message: "Debate not found" });
     }
 
     debate.agree += 1;
     debate.commentsPositive.push({ text });
 
     await debate.save();
 
     res.status(200).json({
       message: "Agree vote added",
       agree: debate.agree,
     });
   } catch (err) {
     res.status(500).json({ message: "Server error" });
   }
 });
 
 
 
router.post("/debates/:id/disagree", async (req, res) => {
   const { text } = req.body;
 
   if (!text) {
     return res.status(400).json({ message: "Comment required" });
   }
 
   try {
     const debate = await Debate.findOne({ id: Number(req.params.id) });
 
     if (!debate) {
       return res.status(404).json({ message: "Debate not found" });
     }
 
     debate.disagree += 1;
     debate.commentsNegative.push({ text });
 
     await debate.save();
 
     res.status(200).json({
       message: "Disagree vote added",
       disagree: debate.disagree,
     });
   } catch (err) {
     res.status(500).json({ message: "Server error" });
   }
 });
 
export default router;