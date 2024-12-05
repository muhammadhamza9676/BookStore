
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import BookCard from '@/components/common/book.card';
import AuthorInfo from '@/components/common/author.info';
import path from 'path';
import fs from 'fs';
import Navbar from '@/components/common/navbar';

export default function AuthorDetailPage({ author, authorBooks, imgPath }) {
  const notableWorks = ["The Great Fall", "Tender Is the Night", "This Side of Paradise"];

  const hLabel1 = () => {
    return (
      <Link href="/authors" className="flex items-center text-gray-900 hover:text-gray-600">
        <ArrowLeft className="mr-2" />
        <span className="text-lg font-semibold">Go to Authors</span>
      </Link>
    )
  }

  const hLabel2 = () => {
    return (
      <h1 className="text-3xl font-bold text-gray-900">Author Details</h1>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar label1={hLabel1} label2={hLabel2} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <AuthorInfo notableWorks={notableWorks} author={author} />

          <h2 className="text-2xl font-bold mt-12 mb-6">Books by {author.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {authorBooks.map((book) => (
              <BookCard key={book.id} imagePath={imgPath} book={book} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const filePath = path.join(process.cwd(), 'Data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const author = data.authors.find((auth) => auth.id === id);

  if (!author) {
    return {
      notFound: true,
    };
  }

  const authorBooks = data.books.filter((book) => book.authorId === id);

  return {
    props: {
      author,
      authorBooks,
      imgPath: '/defaultbook.jpg',
    },
  };
}
