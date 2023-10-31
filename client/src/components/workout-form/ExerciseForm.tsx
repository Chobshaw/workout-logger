import { useFieldArray, useForm } from "react-hook-form";
import SetDisplay from "./SetDisplay";
import SetForm, { SetFormValues } from "./SetForm";
import { useState } from "react";
import SetForm2 from "./SetForm2";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const setFormSchema = z.object({
  load: z.coerce
    .number({
      required_error: "Please specify the load",
    })
    .gte(0, "Load cannot be negative"),
  reps: z.coerce
    .number({
      required_error: "Please specify the number of reps",
    })
    .gt(0, "Come on lad. Do at least one rep!"),
  setCount: z.coerce
    .number({
      required_error: "Please specify the number of sets",
    })
    .gt(0, "Come on lad. Do at least one set!"),
});

const exerciseFormSchema = z.object({
  name: z.string({
    required_error: "Provide a name for your exercise",
  }),
  sets: z.array(setFormSchema),
});

export type ExerciseFormValues = {
  name: string;
  sets: SetFormValues[];
};

type ExerciseFormProps = {
  onSubmit: (exercise: ExerciseFormValues) => void;
};

export default function ExerciseForm({ onSubmit }: ExerciseFormProps) {
  const { register, handleSubmit, trigger, formState, control } =
    useForm<ExerciseFormValues>({
      defaultValues: {
        name: "",
        sets: [],
      },
      resolver: zodResolver(exerciseFormSchema),
    });
  const { errors } = formState;
  const { fields, append } = useFieldArray({ name: "sets", control });
  const [formIsOpen, setFormIsOpen] = useState(false);

  const handleSubmitSet = (set: SetFormValues) => {
    append(set);
    setFormIsOpen(false);
  };

  return (
    <div className="exercise-form">
      <h3>New Exercise</h3>

      <label htmlFor={`exercise-name`}>Please give your exercise a name</label>
      <input
        id={`exercise-name`}
        type="text"
        {...register(`name` as const, {
          required: {
            value: true,
            message: "Please provide a name for your exercise.",
          },
        })}
      />

      <p>Please add sets below</p>
      <div className="set-container">
        <div className="set-titles">
          <h3>Load (kg)</h3>
          <h3>Reps</h3>
          <h3>No. of sets</h3>
        </div>
        {fields.map((field, index) => (
          <SetForm2
            key={field.id}
            setNumber={index}
            register={register}
            trigger={trigger}
            errors={errors.sets?.[index]}
          />
        ))}
      </div>
      {/* {<SetDisplay sets={fields} />}
      {formIsOpen && <SetForm onSubmit={handleSubmitSet} />} */}

      <button
        className="material-symbols-outlined add"
        type="button"
        onClick={() => {
          append({ load: null, reps: null, setCount: null, editing: true });
        }}
      >
        add
      </button>

      <button
        className="submit bottom-right"
        type="button"
        onClick={handleSubmit(onSubmit)}
      >
        Done!
      </button>
    </div>
  );
}
