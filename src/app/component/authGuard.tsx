"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../lib/authStore";
import { ReactNode, useEffect } from "react";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);
  if (!user) return null;

  return <>{children}</>;
}
