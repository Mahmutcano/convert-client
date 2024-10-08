'use client'

import * as React from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { getSitemap } from "@/utils/getSitemap"
import { useTranslations } from "next-intl"


export default function DynamicSearchInput() {
    const t = useTranslations('Sitemap');
  const [searchTerm, setSearchTerm] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dropdownRef = React.useRef<HTMLUListElement>(null) // Reference for the dropdown

  const sitemapEntries = getSitemap(t);

  const filteredEntries = React.useMemo(() => {
    return sitemapEntries.filter((entry) =>
      entry.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setIsOpen(true)
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search pages..."
          value={searchTerm}
          onChange={handleInputChange}
          className="pl-8"
        />
      </div>
      {isOpen && searchTerm && (
        <ul
          ref={dropdownRef}
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          {filteredEntries.length === 0 ? (
            <li className="relative cursor-default select-none py-2 px-4 text-gray-700">
              No pages found.
            </li>
          ) : (
            filteredEntries.map((entry) => (
              <li key={entry.link}>
                <Link href={entry.link} className="block cursor-pointer select-none py-2 px-4 hover:bg-gray-100">
                  {entry.title}
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}
