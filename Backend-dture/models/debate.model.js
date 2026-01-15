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
  id: {
    type: Number,
    unique: true
  }
});

export default mongoose.model("Debate", debateSchema);
