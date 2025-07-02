"use client";
import Sidebar from "../component/Sidebar";
import Topbar from "../component/Topbar";
import { useDashboardStore } from "../lib/useDashboardStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isOpen = useDashboardStore((state) => state.sidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      {isOpen && <Sidebar />}
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
