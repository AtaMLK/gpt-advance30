import { useCounterState } from "../store/counterState";

export default function StepCounter() {
  const { count, step, increment, decreament, setStep } = useCounterState();
  return (
    <div className="w-[60%] flex flex-col ">
      <div className="flex gap-4">
        <div className="flex gap-2 ">
          <button
            onClick={increment}
            className="px-4 py-2 bg-stone-400 text-stone-900 rounded"
          >
            +
          </button>
          <p>{count}</p>
          <button
            onClick={decreament}
            className="px-4 py-2 bg-stone-400 text-stone-900 rounded"
          >
            -
          </button>
        </div>
        <select
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          className="border p-1"
        >
          <option value={1}>+1</option>
          <option value={5}>+5</option>
          <option value={10}>+10</option>
        </select>

        <p>step : {step}</p>
      </div>
    </div>
  );
}
