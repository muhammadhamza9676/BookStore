
import { Book, Search, ShoppingCart } from 'lucide-react';

import { Button } from "@/components/ui/button";
import BookCard from '@/components/common/book.card';
import fs from 'fs';
import path from 'path';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Navbar from '@/components/common/navbar';
import { useTheme } from '@/theme.provider';

const imagePath = "/defaultbook.jpg";

export default function BooksPage(props) {

  const { theme } = useTheme();


  const { books } = props;
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBooks, setFilteredBooks] = useState(books)

  const handleSearch = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchTerm)
    const results = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredBooks(results)
  }

  const hLabel1 = () => {
    return (
      <Link href="/">
        <h1 className="text-3xl font-bold flex items-center">
          <Book className="mr-2" />
          Bookworm's Haven
        </h1>
      </Link>
    )
  }

  const hLabel2 = () => {
    return (
      <Button variant="outline" size="icon">
        <ShoppingCart className="h-4 w-4 text-black" />
      </Button>
    )
  }

  return (
    <div className={`${theme === "light" ?"bg-gray-100 text-black":"bg-slate-500 text-gray-300"} min-h-screen`}>

      <Navbar label1={hLabel1} label2={hLabel2} />

      <form onSubmit={handleSearch} className="relative mx-auto my-6 w-full max-w-xl">
        <div className="relative flex justify-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`pl-10 pr-4 py-2 w-full ${theme === "light" ? "bg-white" : "bg-slate-300 text-black"}`}
          />
        </div>
        <Button type="submit" className="absolute right-0 top-0 bottom-0">
          Search
        </Button>
      </form>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">All Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.length === 0 && <>{`No Books found for your search :(`}</>}
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} imagePath={imagePath} />
              ))}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'Data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const books = JSON.parse(jsonData).books;

  return {
    props: {
      books,
    },
    revalidate: 3600
  };
};
