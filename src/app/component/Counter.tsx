/* import { useState } from "react";

interface CounterProps {
  title: string;
}

export default function Counter({ title }: CounterProps) {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 0) setCount(count - 1);
  };

  return (
    <div>
      <button
        className=" p-2 border rounded bg-stone-600 "
        onClick={() => increment()}
      >
        +
      </button>
      <p>
        {title} : {count}
      </p>
      <button
        className=" p-2 border rounded bg-stone-600 "
        onClick={() => decrement()}
      >
        -
      </button>
    </div>
  );
}
 */

import { useCounterStore } from "../lib/counterStore";

export default function Counter() {
  const { count, increase, decrease } = useCounterStore();

  return (
    <div className="flex flex-col items-center gap-4">
      <h2>Global count :{count}</h2>
      <button onClick={increase} className="bg-green-500 px-4 py-2 text-white">
        +
      </button>
      <button onClick={decrease} className="bg-green-500 px-4 py-2 text-white">
        -
      </button>
    </div>
  );
}
