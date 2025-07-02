import { motion } from "framer-motion";
import { useAuthStore } from "../lib/authStore";
import { useDashboardStore } from "../lib/useDashboardStore";
import Button from "./ui/Button";
export default function Sidebar() {
  const isOpen = useDashboardStore((state) => state.sidebarOpen);
  const { logout } = useAuthStore();
  return (
    <motion.div
      initial={false}
      animate={{
        width: isOpen ? 240 : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 h-screen bg-gray-800 text-white overflow-hidden shadow-lg "
    >
      <div className="p-4 font-bold text-lg">Admin</div>
      <ul className="space-y-2 px-4">
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/dashboard/products">Products</a>
        </li>
        <li>
          <a href="/dashboard/orders">Orders</a>
        </li>
        <li>
          <Button variant="primary" onclick={logout}>
            Log out
          </Button>
        </li>
      </ul>
    </motion.div>
  );
}
