/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";

interface counterState {
  count: number;
  step: number;
  increment: () => void;
  decreament: () => void;
  setStep: (step: number) => void;
  reset: () => void;
}

export const useCounterState = create<counterState>((set, get) => ({
  count: 0,
  step: 1,
  increment: () =>
    set((state) => ({
      count: state.count + state.step,
    })),
  decreament: () =>
    set((state) => ({
      count: state.count - state.step,
    })),
  setStep: (step) => set({ step }),
  reset: () => ({ count: 0, setp: 0 }),
}));
