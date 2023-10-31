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
  const { title, description, exercises } = req.body;

  if (!title) {
    return res.status(400).json({
      error: "Please give your workout a title.",
    });
  }

  if (!exercises || exercises.length === 0) {
    return res.status(400).json({
      error: "Please add at least one exercise to your workout.",
    });
  }

  for (let { name, sets } of exercises) {
    if (!name) {
      return res.status(400).json({
        error: "Please provide a name for your exercise.",
      });
    }

    if (!sets || sets.length === 0) {
      return res.status(400).json({
        error: `Please add at least one set to your exercise: ${name}.`,
      });
    }

    for (let { load, reps, setCount } of sets) {
      if (!load || !reps || !setCount) {
        return res.status(400).json({
          error: `One or more of your sets for ${name} contain missing fields. Please fill in all fields.`,
        });
      }
    }
  }

  try {
    const workout = await createWorkout({
      title,
      description,
      exercises,
      userId: req.user._id,
    });
    return res.status(200).json(workout);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
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
