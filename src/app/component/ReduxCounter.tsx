"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { increment, decrement } from "../store/counterSlice";

export default function ReduxCounter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="p-4">
      <h2>Redux Counter: {count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
