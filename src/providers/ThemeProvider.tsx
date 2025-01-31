'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {}
})

export function ThemeProvider({ 
  children, 
  defaultTheme = 'light' 
}: { 
  children: React.ReactNode, 
  defaultTheme?: Theme 
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      // Check localStorage for persisted theme
      const savedTheme = localStorage.getItem('theme') as Theme
      setTheme(savedTheme || defaultTheme)
    }
  }, [isMounted, defaultTheme])

  useEffect(() => {
    if (isMounted) {
      // Apply theme to document
      const root = window.document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(theme)

      // Persist theme in localStorage
      localStorage.setItem('theme', theme)
    }
  }, [theme, isMounted])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook for using theme
export function useTheme() {
  return useContext(ThemeContext)
}