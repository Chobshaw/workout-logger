import express from "express";
import {
  createNewWorkout,
  deleteWorkout,
  getAllWorkouts,
  getWorkout,
  updateWorkout,
} from "../controllers/Workout.controller";
import { isAuthenticated, isValidId } from "../middleware";

const router = express.Router();

router.use(isAuthenticated);

router.get("/", getAllWorkouts);
router.post("/", createNewWorkout);
router.get("/:id", isValidId, getWorkout);
router.delete("/:id", isValidId, deleteWorkout);
router.patch("/:id", isValidId, updateWorkout);

export default router;
