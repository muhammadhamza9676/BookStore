
import Link from 'next/link';
import BookCard from '@/components/common/book.card';
import AuthorInfo from '@/components/common/author.info';
import Navbar from '@/components/common/navbar';
import { ArrowLeft } from 'lucide-react';


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

export async function getServerSideProps({ params }) {
  const { id } = params;

  try {
    const response = await fetch(`http://localhost:3000/api/authors/${id}`);
    const data = await response.json();

    if (!response.ok) {
      return { notFound: true };
    }

    return {
      props: {
        author: data.author,
        authorBooks: data.books,
        imgPath: '/defaultbook.jpg',
      },
    };
  } catch (error) {
    console.error('Error fetching author details:', error);
    return {
      notFound: true,
    };
  }
}