'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Book } from 'lucide-react'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Pass books as a prop
export default function SearchBar({ books }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [previousSearches, setPreviousSearches] = useState([])
  const dropdownRef = useRef(null)

  useEffect(() => {
    // Load previous searches from localStorage when the component mounts
    const storedSearches = JSON.parse(localStorage.getItem('searchHistory')) || []
    setPreviousSearches(storedSearches)
  }, [])

  const filterBooks = (term) => {
    const searchWords = term.toLowerCase().split(' ')
    return books.filter(book =>
      searchWords.some(word =>
        book.title.toLowerCase().includes(word) ||
        book.author.toLowerCase().includes(word)
      )
    )
  }

  useEffect(() => {
    if (searchTerm.trim().length > 0) {
      // Filter previous searches and books based on the search term
      const filteredHistory = previousSearches.filter(search =>
        search.toLowerCase().includes(searchTerm.toLowerCase())
      )
      const filteredBooks = filterBooks(searchTerm)
      setFilteredBooks([...filteredHistory, ...filteredBooks])
    }
    setShowDropdown(true)
  }, [searchTerm])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()

    if (searchTerm) {
      const updatedSearches = [...new Set([searchTerm, ...previousSearches])].slice(0, 5)
      setPreviousSearches(updatedSearches)
      localStorage.setItem('searchHistory', JSON.stringify(updatedSearches))
    }

    console.log('Searching for:', searchTerm)
    setShowDropdown(false)
  }

  const handleInputClick = () => {
    if (!searchTerm.trim()) {
      setShowDropdown(true)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onClick={handleInputClick}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
        <Button type="submit" className="absolute right-0 top-0 bottom-0">
          Search
        </Button>
      </form>

      {showDropdown && (
        <Card className="mt-1 absolute z-10 w-60 max-h-60 overflow-auto" ref={dropdownRef}>
          <CardContent className="p-0">
            {/* Show history when input is empty */}
            {searchTerm.trim() === '' && previousSearches.length > 0 && (
              <div className="p-2 bg-gray-100">
                <div className="font-bold text-gray-500">Search History</div>
                {previousSearches.map((search, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(search)
                      setShowDropdown(false)
                    }}
                  >
                    {search}
                  </div>
                ))}
              </div>
            )}

            {/* No history and no search input */}
            {searchTerm.trim() === '' && previousSearches.length === 0 && (
              <div className="p-2 text-gray-500">Start typing...</div>
            )}

            {/* Filtered search results */}
            {searchTerm.trim() !== '' && filteredBooks.length > 0 && (
              filteredBooks.map((item, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => {
                    setSearchTerm(typeof item === 'string' ? item : item.title)
                    setShowDropdown(false)
                  }}
                >
                  {typeof item === 'string' ? (
                    <div>{item}</div>
                  ) : (
                    <>
                      <Book className="mr-2 h-4 w-4 text-gray-500" />
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.author}</div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}

            {searchTerm.trim() !== '' && filteredBooks.length === 0 && (
              <div className="p-2 text-gray-500">No books found</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
