import express from "express";
import {
  createWorkout,
  deleteWorkoutById,
  getWorkoutById,
  getWorkoutsByUserId,
  updateWorkoutById,
} from "../db/Workout.db";
import { RequestWithUser } from "../middleware";

export async function getAllWorkouts(
  req: RequestWithUser,
  res: express.Response
) {
  try {
    const workouts = await getWorkoutsByUserId(req.user._id);
    return res.status(200).json(workouts).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}

export async function createNewWorkout(
  req: RequestWithUser,
  res: express.Response
) {
  const { title, load, reps } = req.body;

  const emptyFields = ["title", "load", "reps"].filter(
    (field) => !req.body[field]
  );

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill in all fields before submitting.",
      emptyFields,
    });
  }

  try {
    const workout = await createWorkout({
      userId: req.user._id,
      title,
      load,
      reps,
    });
    return res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message, emptyFields });
  }
}

export async function getWorkout(req: express.Request, res: express.Response) {
  try {
    const { id } = req.params;
    const workout = await getWorkoutById(id);
    if (!workout) {
      return res.status(404).json({ error: "Workout item does not exist." });
    }
    return res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}

export async function deleteWorkout(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.params;
    const workout = await deleteWorkoutById(id);
    if (!workout) {
      return res.status(404).json({ error: "Workout item does not exist." });
    }
    return res.status(200).json(workout).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}

export async function updateWorkout(
  req: express.Request,
  res: express.Response
) {
  try {
    const { id } = req.params;
    const updatedValues = req.body;
    const workout = await updateWorkoutById(id, updatedValues);
    if (!workout) {
      return res.status(404).json({ error: "Workout item does not exist." });
    }
    return res.status(200).json(workout).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
}
