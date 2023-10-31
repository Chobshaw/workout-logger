import { FieldErrors, UseFormRegister, UseFormTrigger } from "react-hook-form";

export type SetFormValues = {
  load: number | null;
  reps: number | null;
  setCount: number | null;
  editing: boolean;
};

export type ExerciseFormValues = {
  name: string;
  sets: SetFormValues[];
};

type SetFormProps = {
  setNumber: number;
  register: UseFormRegister<ExerciseFormValues>;
  trigger: UseFormTrigger<ExerciseFormValues>;
  errors: FieldErrors<SetFormValues> | undefined;
};

export default function SetForm({
  setNumber,
  register,
  trigger,
  errors,
}: SetFormProps) {
  return (
    <div className="set-form">
      <div className="set-field">
        {/* <label htmlFor={`load-${setNumber}`}>Load:</label> */}
        <input
          className={errors?.load !== undefined ? "error" : ""}
          id={`load-${setNumber}`}
          type="number"
          {...register(`sets.${setNumber}.load`)}
        />
        {errors?.load !== undefined && (
          <p className="error">{errors?.load?.message}</p>
        )}
      </div>

      <div className="set-field">
        {/* <label htmlFor={`reps-${setNumber}`}>Reps:</label> */}
        <input
          className={errors?.reps !== undefined ? "error" : ""}
          id={`reps-${setNumber}`}
          type="number"
          {...register(`sets.${setNumber}.reps`)}
        />
        {errors?.reps !== undefined && (
          <p className="error">{errors?.reps?.message}</p>
        )}
      </div>

      <div className="set-field">
        {/* <label htmlFor={`setCount-${setNumber}`}>No. of sets:</label> */}
        <input
          className={errors?.setCount !== undefined ? "error" : ""}
          id={`setCount-${setNumber}`}
          type="number"
          {...register(`sets.${setNumber}.setCount`)}
        />
        {errors?.setCount !== undefined && (
          <p className="error">{errors?.setCount?.message}</p>
        )}
      </div>
      <button
        className="material-symbols-outlined done"
        type="button"
        // onClick={handleSubmit(onSubmit)}
        onClick={() => {
          trigger(`sets.${setNumber}`);
        }}
      >
        done
      </button>
    </div>
  );
}
