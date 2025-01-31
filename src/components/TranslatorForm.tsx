"use client"

import { type FormEvent, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { toast } from "sonner"
import { translate } from "@/lib/actions"

export const TranslatorForm = () => {
  const [inputText, setInputText] = useState("")
  const [generatedText, setGeneratedText] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState("Spanish")
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGeneratedText(null)
    setIsExpanded(true)

    if (!inputText) {
      toast.error("Invalid input, please make sure to write at least 2 characters")
      return;
    }

    try {
      const text = await translate(inputText, selectedLanguage)
      setGeneratedText(text)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const toggleLanguageSelector = () => {
    setIsLanguageSelectorOpen(!isLanguageSelectorOpen)
  }

  const selectLanguage = (language: string) => {
    setSelectedLanguage(language)
    setIsLanguageSelectorOpen(false)
  }

  return (
    <motion.div
      initial={false}
      animate={isExpanded ? { y: -100 } : { y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="w-full max-w-3xl"
    >
      <motion.h1
        initial={false}
        animate={isExpanded ? { fontSize: "2rem", marginBottom: "1rem" } : { fontSize: "4rem", marginBottom: "2rem" }}
        className="font-bold text-center transition-colors duration-300 text-neutral-900 dark:text-neutral-50"
      >
        Zephyr
      </motion.h1>
      <form onSubmit={handleSubmit} className="relative">
        <div className="min-w-96 relative flex transition-all items-center px-6 py-4 ring-2 dark:has-[:focus]:ring-rose-600 has-[:focus]:ring-blue-600 ring-transparent rounded-full dark:bg-neutral-800 bg-neutral-200 gap-x-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-full bg-transparent outline-none placeholder:text-neutral-500 text-neutral-900 dark:text-neutral-200"
            placeholder="Enter text to translate..."
          />
          <div className="relative">
            <button
              type="button"
              onClick={toggleLanguageSelector}
              className="px-3 py-2 text-sm text-gray-700 transition-colors duration-300 bg-gray-100 rounded-full dark:text-neutral-200 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 focus:outline-none"
            >
              {selectedLanguage}
            </button>
            <AnimatePresence>
              {isLanguageSelectorOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 z-10 w-32 mt-2 transition-colors duration-300 bg-white rounded-md shadow-lg dark:bg-neutral-800"
                >
                  <button
                    onClick={() => selectLanguage("Spanish")}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 transition-colors duration-300 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
                  >
                    Spanish
                  </button>
                  <button
                    onClick={() => selectLanguage("English")}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 transition-colors duration-300 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-700"
                  >
                    English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button
            type="submit"
            className="p-2 text-white transition-all duration-300 bg-blue-600 rounded-full hover:scale-125 dark:hover:bg-rose-800 dark:bg-rose-600 hover:bg-blue-800 focus:outline-none"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </form>
      <AnimatePresence>
        {isExpanded && generatedText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-4 mt-6 transition-colors duration-300 bg-white rounded-lg shadow dark:bg-neutral-800"
          >
            <h2 className="mb-2 text-lg font-semibold text-gray-800 transition-colors duration-300 dark:text-neutral-200">
              Translation:
            </h2>
            <p className="text-gray-600 transition-colors duration-300 dark:text-neutral-300">{generatedText}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}