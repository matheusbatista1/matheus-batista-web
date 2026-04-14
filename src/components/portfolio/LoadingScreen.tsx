"use client";

import { motion } from "motion/react";
import { MbLogo } from "./MbLogo";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <MbLogo className="h-[200px] w-auto text-text-primary md:h-[300px]" />
        </motion.div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-2xl font-extralight tracking-wide text-text-secondary md:text-4xl"
        >
          matheusbatista
        </motion.span>
      </motion.div>
    </div>
  );
}
