"use client";

import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  loading?: boolean;
};

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  variant = "danger",
  loading = false,
}: Props) {
  const colors = {
    danger: {
      icon: "text-[#ff453a]",
      iconBg: "bg-[#ff453a]/10",
      button: "bg-[#ff453a] hover:bg-[#ff6961] active:bg-[#e03e35]",
    },
    warning: {
      icon: "text-[#ff9f0a]",
      iconBg: "bg-[#ff9f0a]/10",
      button: "bg-[#ff9f0a] hover:bg-[#ffb340] active:bg-[#e08f09]",
    },
  };

  const c = colors[variant];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: "spring", damping: 26, stiffness: 400 }}
            className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-32px)] max-w-[340px] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="overflow-hidden rounded-2xl bg-[#1c1c1e] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 z-10 flex size-7 items-center justify-center rounded-full bg-white/5 text-[#8c8c8c] transition-colors hover:bg-white/10"
              >
                <X size={14} />
              </button>

              <div className="flex flex-col items-center px-8 pb-6 pt-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 300, delay: 0.05 }}
                  className={`mb-5 flex size-[56px] items-center justify-center rounded-full ${c.iconBg}`}
                >
                  <AlertTriangle size={28} strokeWidth={1.5} className={c.icon} />
                </motion.div>

                <h3 className="mb-2 text-center text-[17px] font-semibold tracking-[-0.2px] text-[#f5f5f7]">
                  {title}
                </h3>
                <p className="mb-7 text-center text-[13px] leading-[1.6] text-[#8c8c8c]">
                  {description}
                </p>

                <div className="flex w-full gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={loading}
                    className="flex h-[44px] flex-1 items-center justify-center rounded-xl bg-white/8 text-[15px] font-medium text-[#f5f5f7] transition-colors hover:bg-white/12 active:bg-white/6"
                  >
                    {cancelLabel}
                  </button>
                  <button
                    type="button"
                    onClick={onConfirm}
                    disabled={loading}
                    className={`flex h-[44px] flex-1 items-center justify-center rounded-xl text-[15px] font-medium text-white transition-colors disabled:opacity-50 ${c.button}`}
                  >
                    {loading ? "..." : confirmLabel}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
