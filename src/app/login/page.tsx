"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import ToastList from "../component/ui/ToastList";
import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "../lib/toastStore";

export default function LoginPage() {
  const { showToast } = useToastStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      showToast("Login failed: " + error.message, "error");
    } else {
      showToast("Logged In", "success");
    }
  };
  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      showToast("SignUp failed: " + error.message, "error");
    } else {
      showToast("Signed Up", "success");
    }
  };
  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return (
    <AnimatePresence>
      <ToastList />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-10 max-w-md mx-auto w-[40%] space-y-4 flex flex-col items-center justify-center"
      >
        <h1 className="text-2xl font-bold"> Login / SignUp </h1>
        <input
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="outline-blue-600/70 w-full py-2 px-4"
        />
        <input
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="outline-blue-600/70 w-full py-2 px-4"
        />
        <div className="flex flex-col gap-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="bg-black text-white px-4 py-2 rounded  w-full "
            onClick={handleLogin}
          >
            Login
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="bg-gray-700 text-white px-4 py-2 rounded w-full "
            onClick={handleSignUp}
          >
            Sign Up
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="bg-stone-200 text-white px-4 py-2 rounded hover:shadow shadow-stone-500 transition-all duration-75 w-full "
            onClick={handleGoogle}
          >
            <img src="./google.svg" className="mx-auto w-8 h-8 " />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
