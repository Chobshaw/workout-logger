import { useForm } from "react-hook-form";
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

export type SetFormValues = {
  load: number | null;
  reps: number | null;
  setCount: number | null;
  editing: boolean;
};

type SetFormProps = {
  onSubmit: (set: SetFormValues) => void;
};

export default function SetForm({ onSubmit }: SetFormProps) {
  const { register, handleSubmit, formState, trigger } = useForm<SetFormValues>(
    {
      defaultValues: {
        load: null,
        reps: null,
        setCount: null,
      },
      resolver: zodResolver(setFormSchema),
    }
  );
  const { errors } = formState;

  return (
    <div className="set-form">
      <div className="set-field">
        <label htmlFor="load">Load:</label>
        <input id="load" type="number" {...register("load")} />
        <p className={errors.load !== undefined ? "error" : ""}>
          {errors.load?.message}
        </p>
      </div>

      <div className="set-field">
        <label htmlFor="reps">Reps:</label>
        <input id="reps" type="number" {...register("reps")} />
        <p className={errors.reps !== undefined ? "error" : ""}>
          {errors.reps?.message}
        </p>
      </div>

      <div className="set-field">
        <label htmlFor="setCount">No. of sets:</label>
        <input id="setCount" type="number" {...register("setCount")} />
        <p className={errors.setCount !== undefined ? "error" : ""}>
          {errors.setCount?.message}
        </p>
      </div>
      <button
        className="material-symbols-outlined done"
        type="button"
        // onClick={handleSubmit(onSubmit)}
        onClick={() => trigger("load")}
      >
        done
      </button>
    </div>
  );
}
