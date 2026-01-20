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
  agreeCom: {
  type: [
    {
      user: { type: String, required: true },
      commets: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  default: [],
},

 disagreeCom: {
  type: [
    {
      user: { type: String, required: true },
      commets: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  default: [],
},
  deletedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("DeletedDebate", deletedDebateSchema);
