"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../lib/authStore";
import { useEffect } from "react";

export default function AdminHome() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);
  return <div className="tex-2xl font-bold">Welcome to admin panel</div>;
}
