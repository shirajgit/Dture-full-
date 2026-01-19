import mongoose from "mongoose";

const deletedDebateSchema = new mongoose.Schema({
  originalId: String,
  name: String,
  description: String,
  image: String,
  duration: String,
  user: String,
  agree: Number,
  disagree: Number,
  deletedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("DeletedDebate", deletedDebateSchema);
