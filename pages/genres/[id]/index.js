import React from 'react';
import { ArrowLeft, Book, ShoppingCart } from 'lucide-react';

import { Button } from "@/components/ui/button";
import BookCard from '@/components/common/book.card';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Navbar from '@/components/common/navbar';
import { useTheme } from '@/theme.provider';

const imagePath = "/defaultbook.jpg";

const SpecificGenres = (props) => {
  const { genre, genreBooks } = props;

  const { theme } = useTheme();


  const hLabel1 = () => {
    return (
      <Link href="/genres" className="flex items-center">
        <ArrowLeft className="mr-2" />
        <span className="text-lg font-semibold">Back to Genres</span>
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
    <div className={`min-h-screen ${theme === "light" ? "bg-gray-100 text-black" : "bg-slate-500 text-gray-300"}`}>

      <Navbar label1={hLabel1} label2={hLabel2} />

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{genre.name} Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {genreBooks.length === 0 && <>No Books Found for {genre}.</>}
              {genreBooks.map((book) => (
                <BookCard key={book.id} book={book} imagePath={imagePath} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SpecificGenres;



export async function getServerSideProps({ params }) {
  const filePath = path.join(process.cwd(), 'Data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const { genres, books } = JSON.parse(jsonData);

  const genre = genres.find((genre) => genre.id === params.id);

  if (!genre) {
    return {
      notFound: true,
    };
  }

  const genreBooks = books.filter((book) => book.genreId === params.id);

  return {
    props: {
      genre,
      genreBooks,
    },
  };
}

