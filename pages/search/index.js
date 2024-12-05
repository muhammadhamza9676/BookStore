import SearchBar from '@/components/common/searchbar'
import React from 'react'

const SearchPage = () => {

  const books = [
  { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 2, title: "1984", author: "George Orwell" },
  { id: 3, title: "Pride and Prejudice", author: "Jane Austen" },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 5, title: "Moby Dick", author: "Herman Melville" },
  { id: 6, title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { id: 7, title: "Jane Eyre", author: "Charlotte Brontë" },
  { id: 8, title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 9, title: "Fahrenheit 451", author: "Ray Bradbury" },
  { id: 10, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
]
  return (
    <div>
      <SearchBar books={books}/>
    </div>
  )
}

export default SearchPage
