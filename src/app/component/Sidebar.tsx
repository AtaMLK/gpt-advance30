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
      <div className="p-4 font-bold text-lg mb-20">Admin</div>
      <ul className="space-y-8 px-4 ">
        <li>
          <a href="/admin">Admin Dashboard</a>
        </li>
        <li>
          <a href="/admin/products">Products</a>
        </li>
        <li>
          <a href="/admin/orders">Orders</a>
        </li>
      </ul>
    </div>
  );
}
