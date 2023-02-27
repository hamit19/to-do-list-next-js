import mongoose from "mongoose";

const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    required: true,
    unique: true,
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);
