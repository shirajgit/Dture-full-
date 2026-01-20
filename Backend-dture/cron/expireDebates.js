import cron from "node-cron";
 import debateSchema from "../models/debate.model.js";
import DeletedDebate from "../models/DeletedDebate.js";

cron.schedule("*/1 * * * *", async () => {
  try {
    const now = new Date();

    const expiredDebates = await  debateSchema.find({
      expiresAt: { $lte: now },
    });

    if (expiredDebates.length === 0) return;

    await DeletedDebate.insertMany(
      expiredDebates.map(d => ({
        originalId: d._id,
        name: d.name,
        description: d.description,
        image: d.image,
        duration: d.duration,
        user: d.user,
        agree: d.agree,
        disagree: d.disagree,
        expiredAt: d.expiresAt,
        disagreeCom: d.disagreeCom ,
        agreeCom: d.agreeCom
      }))
    );

    await  debateSchema.deleteMany({
      _id: { $in: expiredDebates.map(d => d._id) },
    });

    console.log(`🗑️ Archived ${expiredDebates.length} expired debates`);
  } catch (err) {
    console.error("❌ Cron error:", err.message);
  }
});
