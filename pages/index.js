import { useRouter } from 'next/router';
import { Book, ShoppingCart } from 'lucide-react';

import { Button } from "@/components/ui/button";
import BookCard from '@/components/common/book.card';
import fs from 'fs';
import path from 'path';
import Navbar from '@/components/common/navbar';
import { useTheme } from '@/theme.provider';

const imagePath = "/defaultbook.jpg";

export default function HomePage(props) {

  const { theme } = useTheme();

  const { books } = props;
  const router = useRouter();

  const handleViewGenres = () => {
    router.push('/genres');
  };

  const handleViewAll = () => {
    router.push('/books');
  };

  const hLabel1 = () => {
    return (
      <h1 className="text-3xl font-bold flex items-center">
        <Book className="mr-2" />
        Bookworm's Haven
      </h1>
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
    <div className="min-h-screen bg-gray-100">

      <Navbar label1={hLabel1} label2={hLabel2} />

      <main className={`${theme === "light" ?"bg-gray-100 text-black":"bg-slate-500 text-gray-300"} shadow`}>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Featured Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} imagePath={imagePath} />
              ))}
            </div>
            <div className="mt-12 flex justify-center gap-3 text-center">
              <Button className="text-black" variant="outline" size="lg" onClick={handleViewGenres}>
                View Genres
              </Button>
              <Button size="lg" onClick={handleViewAll}>
                View All Books
              </Button>
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
  const allbooks = JSON.parse(jsonData).books;

  const books = allbooks.filter(book => book.featured === true);

  return {
    props: {
      books,
    },
  };
};
