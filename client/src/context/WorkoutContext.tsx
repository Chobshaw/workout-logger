import { createContext, useReducer } from "react";

export type Workout = {
  _id: string;
  title: string;
  load: number;
  reps: number;
  createdAt: string;
};

interface WorkoutsState {
  workouts: Workout[];
}

interface WorkoutsAction {
  type: "SET_WORKOUTS" | "CREATE_WORKOUT" | "DELETE_WORKOUT";
  payload: any;
}

export const WorkoutsContext = createContext<{
  workouts: Workout[] | null;
  dispatch: React.Dispatch<any>;
}>({
  workouts: null,
  dispatch: () => null,
});

export function workoutsReducer(state: WorkoutsState, action: WorkoutsAction) {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { workouts: action.payload };
    case "CREATE_WORKOUT":
      return { workouts: [action.payload, ...state.workouts] };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
}

export function WorkoutsContextProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
}
