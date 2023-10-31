import { useState } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import Modal from "../Modal";
import { FormValues } from "../../pages/Form";
import ExerciseForm, { ExerciseFormValues } from "./ExerciseForm";

type ExercisePopupProps = {
  appendExercise: UseFieldArrayAppend<FormValues, "exercises">;
};

export default function ExercisePopup({ appendExercise }: ExercisePopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  function handleSubmitExercise(exercise: ExerciseFormValues) {
    appendExercise(exercise);
    setIsOpen(false);
  }

  return (
    <div>
      <button
        className="material-symbols-outlined add"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        add
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <ExerciseForm onSubmit={handleSubmitExercise} />
      </Modal>
    </div>
  );
}
