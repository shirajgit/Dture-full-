 import cors from "cors";
 import express from "express";
 
 import debateSchema from "../models/debate.model.js";
import authMiddleware from "../middleware/auth.js";
  
 const  router = express();
 const port = 3000;  
 

router.post("/create", async (req, res) => {
  try {
    const { name, description, duration, image, user,id } = req.body;
     let expire = 1

    if(duration === "7 Days"){
      expire = 7 } else if(duration === "3 Days"){ expire = 3} 

    const expiresAt = new Date(
      Date.now() + expire * 24 * 60 * 60 * 1000
    );

    const debate = await debateSchema.create({
      id,
      name,
      description,
      image,
      duration,
      user,
      expiresAt,
    });

    res.status(201).json({ success: true, debate });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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
 
 
 
router.post("/debates/:id", async (req, res) => {
   const { voter, agree , disagree } = req.body;
 
 
   try {
     const debate = await debateSchema.findOne({ id: Number(req.params.id) });
 
     if (!debate) {
       return res.status(404).json({ message: "Debate not found" });
     }
   
     if (!debate.Voters.includes(voter)) {
       debate.Voters.push(voter);
      
     } else {
       return res.status(400).json({ message: "User has already voted" });
     }
     
     if (agree) { 
        debate.agree += 1;
      } else if (disagree) {
        debate.disagree += 1;
      }
  
    
     await debate.save();
 
     res.status(200).json({
       message: "Agree vote added",
       agree: debate.agree,
     });
   } catch (err) {
     res.status(500).json({ message: "Server error" });
   }
 });
 
 router.get("/debates/:id", async (req, res) => {
  const debate = await debateSchema.findById(req.params.id);
  if (!debate) return res.status(404).json({ message: "Not found" });
  res.json(debate);
});

router.put("/debates/:id/agree", authMiddleware, async (req, res) => {
  const userId = req.userId; // ✅ correct

  const debate = await debateSchema.findById(req.params.id);
  if (!debate) return res.status(404).json({ message: "Debate not found" });

  if (debate.Voters.includes(userId)) {
    return res.status(400).json({ message: "Already voted" });
  }

  debate.agree += 1;
  debate.Voters.push(userId);

  await debate.save();
  res.json(debate);
});



router.put("/debates/:id/disagree", authMiddleware, async (req, res) => {
  const userId = req.userId;

  const debate = await debateSchema.findById(req.params.id);
  if (!debate) return res.status(404).json({ message: "Debate not found" });

  if (debate.Voters.includes(userId)) {
    return res.status(400).json({ message: "Already voted" });
  }

  debate.disagree += 1;
  debate.Voters.push(userId);

  await debate.save();
  res.json(debate);
});


router.put("/debates/:id/discommets",authMiddleware , async (req, res)=>{
  const userId = req.userId;
  const {commets} = req.body;

  const debate = await debateSchema.findById(req.params.id);
  if (!debate) return res.status(404).json({ message: "Debate not found" });

 
  debate.disagreeCom.push(commets);

  await debate.save();
  res.json(debate);

 })

 router.put("/debates/:id/aggcommets",authMiddleware , async (req, res)=>{
 
  const {commets} = req.body;

  const debate = await debateSchema.findById(req.params.id);
  if (!debate) return res.status(404).json({ message: "Debate not found" });
   
  debate.agreeCom.push(commets);

  await debate.save();
  res.json(debate);

 })
 
export default router;