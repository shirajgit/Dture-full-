import mongoose from "mongoose";

const debateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: String,

    duration: {
      type: Number,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    user: String,

    id: {
      type: Number,
      unique: true,
    },

    agree: { type: Number, default: 0 },
    disagree: { type: Number, default: 0 },

    Voters: { type: [String], default: [] },

    agreeCom: { type: [String], default: [] },
    disagreeCom: { type: [String], default: [] },
  },
  { timestamps: true }
);
 

debateSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

 
export default mongoose.model("Debate", debateSchema);
