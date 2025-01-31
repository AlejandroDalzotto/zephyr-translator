"use client";

import { motion } from "framer-motion"
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"
import { useTheme } from "@/providers/ThemeProvider";

export const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed p-2 transition-colors duration-300 border border-transparent rounded-full dark:border-neutral-700 top-4 right-4 bg-neutral-950"
      whileTap={{ scale: 0.95 }}
    >
      <motion.div initial={false} animate={{ rotate: theme === "dark" ? 180 : 0 }} transition={{ duration: 0.5 }}>
        {theme === "dark" ? <SunIcon className="w-6 h-6 text-yellow-500" /> : <MoonIcon className="w-6 h-6 text-neutral-50" />}
      </motion.div>
    </motion.button>
  )
}