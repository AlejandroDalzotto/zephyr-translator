"use client";

import { motion } from "framer-motion"
import Link from "next/link";

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="absolute left-0 right-0 text-sm text-center transition-colors duration-300 bottom-4 text-neutral-500 dark:text-neutral-400"
    >
      <p>
        Created by Alejandro Dalzotto |{" "}
        <Link
          href="https://github.com/AlejandroDalzotto/zephyr-translator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 transition-all duration-300 dark:hover:text-rose-800 hover:text-blue-800 hover:scale-110 dark:text-rose-600"
        >
          GitHub Repository
        </Link>
      </p>
    </motion.footer>
  )
}