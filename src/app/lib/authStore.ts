import { create } from "zustand";
import { supabase } from "./supabaseClient";

interface UserState {
  user: unknown | null;
  setUser: (user: unknown) => void;
  fetchUser: () => void;
  logout: () => void;
}



export const useAuthStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    set({ user: session?.user ?? null });
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));