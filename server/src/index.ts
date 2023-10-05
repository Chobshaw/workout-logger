import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import workoutRouter from "./routes/Workout.routes";
import userRouter from "./routes/User.routes";
import compression from "compression";
import cors from "cors";

dotenv.config();

const app = express();

// Add middleware
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}/`);
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/workouts", workoutRouter);
app.use("/users", userRouter);
