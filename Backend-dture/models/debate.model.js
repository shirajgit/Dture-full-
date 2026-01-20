import mongoose from "mongoose";

const debateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: String,

    duration: {
      type: String,
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

  },
  { timestamps: true }
);
 

 

 
export default mongoose.model("Debate", debateSchema);
