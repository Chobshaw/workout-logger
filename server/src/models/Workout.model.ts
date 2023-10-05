import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    load: { type: Number, required: true },
    reps: { type: Number, required: true },
  },
  { timestamps: true }
);

export const WorkoutModel = mongoose.model("Workout", WorkoutSchema);
