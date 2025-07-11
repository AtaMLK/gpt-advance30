"use client";
import { redirect } from "next/navigation";
import React from "react";
import Sidebar from "../component/Sidebar";
import Topbar from "../component/Topbar";
import { ADMIN_EMAIL } from "../constants/appConfig";
import { useAuthStore } from "../lib/authStore";
import { useDashboardStore } from "../lib/useDashboardStore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuthStore((s) => s.user);
  const isAdmin = user?.email === ADMIN_EMAIL;
  const isOpen = useDashboardStore((state) => state.sidebarOpen);
  return (
    <div>
      {isAdmin ? (
        <>
          {isOpen && (
            <div className="flex  h-screen overflow-hidden">
              <Sidebar />
              <div className="w-full ">
                <Topbar />a<main className="flex-1 p-6">{children}</main>
              </div>
            </div>
          )}
        </>
      ) : (
        redirect("/")
      )}
    </div>
  );
}
