"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-[22px] w-[42px]" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-[22px] w-[42px] rounded-full bg-[#404040] transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.span
        animate={{ x: isDark ? 20 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-[3px] left-0 size-[16px] rounded-full bg-[#09090b] shadow-[0px_5px_9px_-2px_rgba(102,102,102,0.23),inset_0px_-1px_2px_0px_black,inset_0px_-4px_2px_0px_#323232]"
      />
    </button>
  );
}
