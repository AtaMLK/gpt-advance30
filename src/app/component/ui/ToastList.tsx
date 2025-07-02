import { useToastStore } from "@/app/lib/toastStore";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

const toastStyles = {
  success: {
    bg: "bg-green-600",
    Icon: CheckCircle,
  },
  error: {
    bg: "bg-red-600",
    Icon: AlertCircle,
  },
  info: {
    bg: "bg-orange-400",
    Icon: Info,
  },
};

export default function ToastList() {
  const toasts = useToastStore((state) => state.toasts as Toast[]);

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      <AnimatePresence>
        {toasts.map((toast) => {
          const { bg, Icon } = toastStyles[toast.type] || toastStyles.info;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 text-white px-4 py-3 rounded-xl shadow-lg ${bg}`}
            >
              <Icon className="w-5 h-5 mt-1" />
              <div className="flex-1 text-sm">{toast.message}</div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
