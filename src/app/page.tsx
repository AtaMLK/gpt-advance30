"use client";
import Link from "next/link";
import { useAuthStore } from "./lib/authStore";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuthStore();
  return (
    <div className="w-full ">
      <div className="flex flex-col h-80 w-full items-center justify-center">
        <Link href={"/playground"}>Play Gournd</Link>
        <Link href={"/login"}>Login</Link>
        {user && (
          <Link
            href={"/shop"}
            onClick={() => {
              setLoading(false);
              logout();
            }}
          >
            {loading ? "Logout" : "...Loading"}
          </Link>
        )}
      </div>
    </div>
  );
}

/*       <ReduxCounter />
 */
