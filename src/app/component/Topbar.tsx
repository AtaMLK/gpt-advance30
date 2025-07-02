"use client";

import { ChevronLeftCircle } from "lucide-react";
import { useDashboardStore } from "../lib/useDashboardStore";

export default function Topbar() {
  const toggleSidebar = useDashboardStore((state) => state.toggleSidebar);
  const isOpen = useDashboardStore((state) => state.sidebarOpen);

  return (
    <div className="bg-white shadow px-6 py-3 flex items-center justify-between">
      <button
        onClick={toggleSidebar}
        className="text-3xl p-1 rounded hover:bg-gray-200 transition"
        aria-label="Toggle Sidebar"
      >
        <ChevronLeftCircle
          className={`transform transition-transform duration-300 ${
            isOpen ? "" : "rotate-180"
          }`}
        />
      </button>
      <div className="text-gray-600">Admin Dashboard</div>
    </div>
  );
}
