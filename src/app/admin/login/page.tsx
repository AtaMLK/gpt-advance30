"use client";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (!error) router.push("/admin");
  };
  return <div><button onClick={handleLogin}>Login</button></div>;
}
