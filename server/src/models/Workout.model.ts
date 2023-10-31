import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    exercises: [
      {
        name: { type: String, required: true },
        sets: [
          {
            load: { type: Number, required: true },
            reps: { type: Number, required: true },
            setCount: { type: Number, required: true },
          },
        ],
      },
    ],
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const WorkoutModel = mongoose.model("Workout", WorkoutSchema);
