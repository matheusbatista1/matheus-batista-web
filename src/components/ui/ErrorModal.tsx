"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ShieldX, WifiOff, AlertTriangle, Ban, ServerCrash } from "lucide-react";

type ErrorType =
  | "access-denied"
  | "account-not-linked"
  | "network"
  | "server"
  | "generic";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  type?: ErrorType;
  title?: string;
  description?: string;
};

const errorConfig: Record<
  ErrorType,
  {
    icon: typeof ShieldX;
    iconColor: string;
    iconBg: string;
    title: string;
    description: string;
  }
> = {
  "access-denied": {
    icon: Ban,
    iconColor: "text-[#ff453a]",
    iconBg: "bg-[#ff453a]/10",
    title: "Access Denied",
    description:
      "You don't have permission to access this area. Only the administrator can sign in to this panel.",
  },
  "account-not-linked": {
    icon: ShieldX,
    iconColor: "text-[#ff9f0a]",
    iconBg: "bg-[#ff9f0a]/10",
    title: "Account Not Linked",
    description:
      "This email is already registered with a different sign-in method. Try using your original sign-in method, or contact support.",
  },
  network: {
    icon: WifiOff,
    iconColor: "text-[#ff9f0a]",
    iconBg: "bg-[#ff9f0a]/10",
    title: "Connection Error",
    description:
      "Unable to connect to the server. Please check your internet connection and try again.",
  },
  server: {
    icon: ServerCrash,
    iconColor: "text-[#ff453a]",
    iconBg: "bg-[#ff453a]/10",
    title: "Server Error",
    description:
      "Something went wrong on our end. Please try again in a few moments.",
  },
  generic: {
    icon: AlertTriangle,
    iconColor: "text-[#ff9f0a]",
    iconBg: "bg-[#ff9f0a]/10",
    title: "Something Went Wrong",
    description:
      "An unexpected error occurred. Please try again or contact support if the problem persists.",
  },
};

export function ErrorModal({
  isOpen,
  onClose,
  type = "generic",
  title,
  description,
}: Props) {
  const config = errorConfig[type];
  const Icon = config.icon;
  const displayTitle = title ?? config.title;
  const displayDesc = description ?? config.description;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              type: "spring",
              damping: 26,
              stiffness: 350,
            }}
            className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-32px)] max-w-[380px] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="overflow-hidden rounded-2xl bg-[#1c1c1e] shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
              {/* Close */}
              <button
                type="button"
                onClick={onClose}
                className="absolute right-3 top-3 z-10 flex size-7 items-center justify-center rounded-full bg-white/5 text-[#8c8c8c] transition-colors hover:bg-white/10 hover:text-[#f5f5f7]"
              >
                <X size={14} />
              </button>

              {/* Content */}
              <div className="flex flex-col items-center px-8 pb-8 pt-10">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 300,
                    delay: 0.1,
                  }}
                  className={`mb-5 flex size-[56px] items-center justify-center rounded-full ${config.iconBg}`}
                >
                  <Icon size={28} strokeWidth={1.5} className={config.iconColor} />
                </motion.div>

                {/* Title */}
                <h3 className="mb-2 text-center text-[17px] font-semibold tracking-[-0.2px] text-[#f5f5f7]">
                  {displayTitle}
                </h3>

                {/* Description */}
                <p className="mb-7 text-center text-[13px] leading-[1.6] text-[#8c8c8c]">
                  {displayDesc}
                </p>

                {/* Button */}
                <button
                  type="button"
                  onClick={onClose}
                  className="h-[44px] w-full rounded-xl bg-white/8 text-[15px] font-medium text-[#f5f5f7] transition-colors hover:bg-white/12 active:bg-white/6"
                >
                  OK
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
