'use client'

import { useEffect, useState } from 'react'

const searchSuggestions = [
  "Search for AC Service",
  "Search for Kitchen Cleaning",
  "Search for Bathroom Deep Clean",
  "Search for Plumbing Work",
  "Search for Electrical Repair",
  "Search for Home Painting"
]

export default function AnimatedSearchPlaceholder() {
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchSuggestions.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return searchSuggestions[placeholderIndex]
}
