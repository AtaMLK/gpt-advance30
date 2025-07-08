"use client";
import { supabase } from "@/app/lib/supabaseClient";
import { useEffect, useState } from "react";

type Order = {
  id: string;
  user_email: string;
  status: string;
  total_price: number;
  created_at: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const pageSize = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      let query = supabase
        .from("tsorders")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

      if (filter) {
        query = query.eq("status", filter);
      }
      const { data, error, count } = await query;

      if (error) console.error("Fetch error", error.message);
      else setOrders(data);
      setTotalCount(count ?? 0);
    };
    fetchOrders();
  }, [filter, page]);

  /* useEffect(()=>{

  },[]) */

  return (
    <div className="flex h-screen w-full flex-col px-20">
      <h1 className="text-2xl font-bold text-blue-900/80 uppercase bg">Orders</h1>
      <table>
        <thead>
          <tr className="">
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Total</th>
            <th className="p-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t">
              <td className="p-2">{order.user_email}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">${order.total_price}</td>
              <td className="p-2">
                {new Date(order.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex gap-2 my-4">
        {["all", "pending", "shipped", "delivered"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status === "all" ? null : status)}
            className={`px-4 py-1 rounded border ${
              filter === status || (status === "all" && !filter)
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-4 items-center">
        <span className="text-sm text-gray-500">
          Showing {(page - 1) * pageSize + 1}–
          {Math.min(page * pageSize, totalCount)} of {totalCount}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page * pageSize >= totalCount}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
