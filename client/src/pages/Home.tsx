import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

import WorkoutForm from "../components/WorkoutForm";
import WorkoutDetails from "../components/WorkoutDetails";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchWorkouts() {
      const response = await fetch("http://localhost:3000/workouts", {
        headers: {
          Authorization: `Bearer ${user && user.token}`,
        },
      });
      const workoutsJson = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: workoutsJson });
      }
    }
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        <h2>Workout History</h2>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
        {workouts && workouts.length === 0 && (
          <div className="box no-workouts">
            <p>You haven't recorded any workouts yet.</p>
            <p>Create your first workout using the form on the right!</p>
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </div>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
}
