"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import AnimatedSearchPlaceholder from "./AnimatedSearchPlaceholder"

type Service = {
  id: string
  name: string
  category: string
}

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState<Service[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length > 2) {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setSuggestions(data)
      } else {
        setSuggestions([])
      }
    }

    fetchSuggestions()
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div ref={searchRef} className="relative flex-1 max-w-xl">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={(<AnimatedSearchPlaceholder />) as any}
          className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 focus:border-gray-300 focus:outline-none focus:ring-0"
        />
      </form>
      {query.length > 2 && suggestions.length > 0 && (
        <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg">
          <ul className="max-h-60 overflow-auto py-1">
            {suggestions.map((service) => (
              <li
                key={service.id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(service.name)}`)
                  setQuery("")
                }}
              >
                {service.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

