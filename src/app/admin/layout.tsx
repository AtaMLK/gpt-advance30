"use client";
import React from "react";
import Sidebar from "../component/Sidebar";
import Topbar from "../component/Topbar";
import { useDashboardStore } from "../lib/useDashboardStore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isOpen = useDashboardStore((state) => state.sidebarOpen);
  return (
    <div className="flex  h-screen overflow-hidden">
      {isOpen && <Sidebar />}
      <div className="w-full ">
        <Topbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
