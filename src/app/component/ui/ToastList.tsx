import { useToastStore } from "@/app/lib/toastStore";
import { motion, AnimatePresence } from "framer-motion";

export default function ToastList() {
  const toasts = useToastStore((state) => state.toasts);
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-black text-white px-4 py-2 rounded-xl shadow-lg"
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
      ;
    </div>
  );
}
