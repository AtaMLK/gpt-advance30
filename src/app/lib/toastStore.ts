    import { set } from "react-hook-form";
    import { create } from "zustand";

    interface Toast {
    id: number;
    message: string;
    }

    interface ToastStore {
    toasts: Toast[];
    showToast: (message: string) => void;
    removeToast: (id: number) => void;
    }

   export const useToastStore=create<ToastStore>((set)=>({
    toasts:[],
    showTest:(message)=>{
        const id = Date.now();
        set((state)=>({
            toastsL[...state.toasts,{id,message}],
        })  )
    }
   }))