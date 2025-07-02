"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ToastList from "../component/ui/ToastList";
import { useAuthStore } from "../lib/authStore";
import { supabase } from "../lib/supabaseClient";
import { useToastStore } from "../lib/toastStore";

export default function LoginPage() {
  const { showToast } = useToastStore();
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) showToast("Login failed: " + error.message, "error");
    else showToast("Logged In", "success");
  };

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) showToast("SignUp failed: " + error.message, "error");
    else showToast("Signed Up", "success");
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastList />
      <motion.div className="relative w-[25rem] h-[28rem] perspective">
        <motion.div
          className="absolute w-full h-full transition-transform duration-700 transform-style-preserve-3d"
          animate={{ rotateY: isOpen ? 0 : 180 }}
        >
          {/* Front side (Login) */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-lg p-10">
            <div className="space-y-4 flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold uppercase">Log In</h1>
              <input
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="outline-blue-600/70 w-full py-2 px-4 rounded border border-stone-300"
              />
              <input
                value={password}
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="outline-blue-600/70 w-full py-2 px-4 rounded border border-stone-300"
              />
              <div className="flex flex-col gap-3 my-5 items-center justify-center">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="bg-blue-600 font-semibold text-white px-4 py-2 rounded w-40"
                  onClick={handleLogin}
                >
                  Login
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="bg-stone-200 text-white px-4 py-2 rounded hover:shadow shadow-stone-500 transition-all duration-75 w-40"
                  onClick={handleGoogle}
                >
                  <Image
                    src="./google.svg"
                    width={24}
                    height={24}
                    className="mx-auto"
                    alt="google logo image"
                  />
                </motion.button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer text-blue-500"
                >
                  Don&apos;t have an account? Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Back side (Sign Up) */}
          <div className="absolute w-full h-full backface-hidden rotateY-180 bg-white shadow-lg rounded-2xl  p-10">
            <div className="space-y-4 flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold uppercase">Sign Up</h1>
              <input
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="outline-blue-600/70 w-full py-2 px-4 rounded border border-stone-300"
              />
              <input
                value={password}
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="outline-blue-600/70 w-full py-2 px-4 rounded border border-stone-300"
              />
              <div className="flex flex-col gap-3 my-5 items-center justify-center">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="bg-green-800 font-semibold text-white px-4 py-2 rounded w-40"
                  onClick={handleSignUp}
                >
                  Sign Up
                </motion.button>
                <button
                  onClick={() => setIsOpen(true)}
                  className="cursor-pointer text-blue-500"
                >
                  Have an account? Sign In
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
