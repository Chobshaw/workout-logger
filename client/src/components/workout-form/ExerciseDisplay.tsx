import { FieldArrayWithId } from "react-hook-form";
import { FormValues } from "../../pages/Form";
import SetDisplay from "./SetDisplay";

type ExerciseDisplayProps = {
  exercise: FieldArrayWithId<FormValues, "exercises", "id">;
};

export default function ExerciseDisplay({ exercise }: ExerciseDisplayProps) {
  return (
    <div>
      <p>{exercise.name}</p>
      <SetDisplay sets={exercise.sets} />
    </div>
  );
}
