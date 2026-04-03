"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full border border-border-color bg-card-bg/40 animate-pulse flex items-center justify-center opacity-50" />
    ); 
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-10 h-10 rounded-full bg-card-bg/60 backdrop-blur-md border border-border-color flex items-center justify-center text-foreground/70 hover:text-sany-red transition-all shadow-sm overflow-hidden group"
      aria-label="Toggle Dark Mode"
    >
      <div className="absolute inset-0 bg-sany-red/0 group-hover:bg-sany-red/5 transition-colors duration-300" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ y: 20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-500" />
          ) : (
            <Moon className="w-5 h-5 text-foreground/80" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
