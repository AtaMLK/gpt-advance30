import { create } from "zustand";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastStore {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: number) => void;
}

let idCounter = 0;

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  showToast: (message, type = "info", duration = 3000) => {
    const id = idCounter++;
    const newToast: Toast = { id, message, type };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, duration);
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));
