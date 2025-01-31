"use client";

import { translate } from "@/lib/actions";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Home() {

  const [generatedText, setGeneratedText] = useState<string | null>(null)
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [targetLanguage, setTargetLanguage] = useState("spanish")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setGeneratedText(null)
    setIsLoading(true)

    if (!inputText) {
      toast.error("Invalid input, please make sure to write at least 2 characters")
      return;
    }

    try {
      const text = await translate(inputText, targetLanguage)
      setGeneratedText(text)
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="container relative flex flex-col items-center justify-center h-screen mx-auto gap-y-16">
      <header>
        <h1 className="text-6xl font-bold text-neutral-950">Zephyr translator</h1>
      </header>
      <section className="relative flex justify-center w-full">
        <form onSubmit={handleSubmit} className="relative flex justify-center w-full max-w-2xl">
          <input
            autoComplete="off"
            className="w-full px-4 py-3 mr-2 border shadow-lg outline-none min-w-80 border-neutral-300 rounded-xl"
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <select
            className="px-4 py-3 mr-2 border shadow-lg outline-none border-neutral-300 rounded-xl"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            <option value="spanish">Spanish</option>
            <option value="english">English</option>
          </select>
          <button
            disabled={isLoading}
            className="px-4 py-3 font-bold capitalize transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed bg-neutral-950 text-neutral-50 rounded-xl hover:bg-neutral-900"
            type="submit">send</button>
        </form>
      </section>
      <section className="relative w-full max-w-2xl">
        <h2 className="mb-4 text-3xl font-bold text-neutral-900">Translation: </h2>
        {isLoading ? (
          <span className="grid w-full text-xl font-medium aspect-video place-content-center animate-pulse text-neutral-950">loading...</span>
        ) : (
          <p className="grid w-full text-xl font-medium aspect-video place-content-start text-neutral-950">{generatedText}</p>
        )}
      </section>
    </main>
  );
}
