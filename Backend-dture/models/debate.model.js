import mongoose from "mongoose";

const debateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  duration: {
    type: String
  },
  user:{
    type: String
  },
  id: {
    type: Number,
    unique: true
  },
  agree: {
    type: Number,
    default: 0
  },
  disagree: {
    type: Number,
    default: 0
  },
  Voters:{
    type: [String],
    default: []
  }
});

export default mongoose.model("Debate", debateSchema);
