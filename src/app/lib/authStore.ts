import { create } from "zustand";
import { supabase } from "./supabaseClient";
import { User } from "@supabase/supabase-js";

interface UserState {
  user: User | null | undefined;
  setUser: (user: User | null) => void;
  fetchUser: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<UserState>((set) => ({
  user: undefined,
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

supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.getState().setUser(session?.user ?? null);
});
