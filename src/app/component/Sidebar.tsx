"use client";

import { useDashboardStore } from "../lib/useDashboardStore";

export default function Sidebar() {
  const isOpen = useDashboardStore((state) => state.sidebarOpen);

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-0"
      } bg-gray-800 text-white transition-all duration-300 overflow-hidden h-full`}
    >
      <div className="p-4 font-bold text-lg">Admin</div>
      <ul className="space-y-2 px-4">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/dashboard/products">Products</a></li>
        <li><a href="/dashboard/orders">Orders</a></li>
      </ul>
    </div>
  );
}
