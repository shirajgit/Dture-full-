 import cors from "cors";
 import express from "express";
 
 import debateSchema from "../models/debate.model.js";
import authMiddleware from "../middleware/auth.js";
  
 const  router = express();
 const port = 3000;  
 
 

 router.post("/create", async (req, res) => {
  try {
    const { name, description, image, duration, id  , user } = req.body;

    const debate =  await debateSchema.create({
      id,
  name,
  description,
  image,
  duration,
  user
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


 router.put('debates/:id/discommets', authMiddleware, async (req, res)=>{
  const userId = req.userId;
  const {Commets} = req.body;

  const debate = await debateSchema.findById(req.params.id);
  if (!debate) return res.status(404).json({ message: "Debate not found" });

  if (debate.Voters.includes(userId)) {
    return res.status(400).json({ message: "Already voted" });
  }

  debate.disagreeCom = Commets ;

  await debate.save();
  res.json(debate);

 })
 
export default router;