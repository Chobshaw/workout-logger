import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import ExercisePopup from "../components/workout-form/ExercisePopup";
import ExerciseDisplay from "../components/workout-form/ExerciseDisplay";
import { ExerciseFormValues } from "../components/workout-form/ExerciseForm";

export type FormValues = {
  title: string;
  description: string;
  exercises: ExerciseFormValues[];
};

export default function Form() {
  const { register, handleSubmit, formState, control } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      exercises: [],
    },
  });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "exercises",
    control,
  });

  function onSubmit(data: FormValues) {
    console.log("Form submitted", data);
  }

  return (
    <div>
      <form
        className="workout-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h3>Add a New Workout</h3>

        <label htmlFor="workout-title">Workout Title:</label>
        <input
          type="text"
          id="workout-title"
          {...register("title", {
            required: {
              value: true,
              message: "Please provide a title for your workout.",
            },
          })}
        />
        {errors.title !== undefined && (
          <p className="error">{errors.title?.message}</p>
        )}

        <label htmlFor="workout-description">Description:</label>
        <input
          type="text"
          id="workout-description"
          {...register("description")}
        />
        {errors.description !== undefined && (
          <p className="error">{errors.description?.message}</p>
        )}

        <label>Exercises</label>
        {fields.length === 0 && (
          <div className="centered-text-box green-small">
            <p>You haven't added any exercises yet</p>
            <p>Add some by clicking the button below!</p>
          </div>
        )}
        {fields.map((field) => (
          <ExerciseDisplay key={field.id} exercise={field} />
        ))}

        <ExercisePopup appendExercise={append} />

        <button className="submit bottom-right">Add workout</button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
