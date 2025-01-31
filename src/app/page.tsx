import { DarkModeToggle, Footer, TranslatorForm } from "@/components";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-2 transition-colors duration-500 min-w-96 bg-neutral-50 dark:bg-neutral-950">
      <DarkModeToggle />
      <TranslatorForm />
      <Footer />
    </div>
  )
}
