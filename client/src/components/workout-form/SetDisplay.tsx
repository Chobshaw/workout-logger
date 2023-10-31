import { SetFormValues } from "./SetForm";

type SetDisplayProps = {
  sets: SetFormValues[];
};

export default function SetDisplay({ sets }: SetDisplayProps) {
  return (
    <div className="green-box">
      <h3>Sets</h3>
      <hr className="line" />
      {sets.map((set, index) => (
        <div key={index} className="set-display">
          <p className="bold">{`${set.setCount}x`}</p>
          <p>{`${set.reps} reps`}</p>
          <p>{`${set.load} kg`}</p>
        </div>
      ))}
    </div>
  );
}
