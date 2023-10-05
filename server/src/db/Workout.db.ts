import { WorkoutModel } from "../models/Workout.model";

export const getWorkouts = () => WorkoutModel.find().sort({ createdAt: -1 });
export const getWorkoutsByUserId = (userId: string) =>
  WorkoutModel.find({ userId }).sort({ createdAt: -1 });
export const createWorkout = (values: Record<string, any>) =>
  WorkoutModel.create(values);
export const getWorkoutById = (id: string) => WorkoutModel.findById(id);
export const deleteWorkoutById = (id: string) =>
  WorkoutModel.findByIdAndDelete(id);
export const updateWorkoutById = (id: string, values: Record<string, any>) =>
  WorkoutModel.findByIdAndUpdate(id, values, { new: true });
