"use client";

import { useDashboardStore } from "../lib/useDashboardStore";

export default function Topbar() {
  const toggleSidebar = useDashboardStore((state) => state.toggleSidebar);

  return (
    <div className="bg-blue-100/40 shadow px-6 py-3 flex items-center justify-between">
      <button onClick={toggleSidebar} className="text-xl font-bold">
        ☰
      </button>
      <div className="text-gray-600">Admin Dashboard</div>
    </div>
  );
}
