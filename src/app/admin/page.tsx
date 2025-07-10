"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ADMIN_EMAIL } from "../constants/appConfig";
import { useAuthStore } from "../lib/authStore";

export default function AdminPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return;

    if (!user) {
      router.push("/login");
    } else if (user.email !== ADMIN_EMAIL) {
      router.push("/");
    }
  }, [user]);

  if (user === undefined) return <div>Loading...</div>;

  return (
    <div className="text-2xl font-bold p-10">
      Welcome, Admin. This is your dashboard.
    </div>
  );
}
