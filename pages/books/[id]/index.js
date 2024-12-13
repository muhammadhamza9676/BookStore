import { useRouter } from 'next/router';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from "@/components/ui/button";
import BookDetail from '@/components/common/book.detail';
import Navbar from '@/components/common/navbar';
import { useTheme } from '@/theme.provider';
import AppSpinner from '@/components/common/spinner';
import { useAuth } from '@/auth.provider';

export default function BookDetailPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;
  const { theme } = useTheme();

  const [book, setBook] = useState(null);
  const [genre, setGenre] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBook(data.book);
        setGenre(data.genre);
        setAuthor(data.author);
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user === null) {
        router.push("/login");
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, [user, router]);

  if (loading || !book || !user) {
    return <div><AppSpinner/></div>;
  }

  const hLabel1 = () => {
    return (
      <Link href="/books" className="flex items-center">
        <ArrowLeft className="mr-2" />
        <span className="text-lg font-semibold">Back to All Books</span>
      </Link>
    );
  };

  const hLabel2 = () => {
    return (
      <Button variant="outline" size="icon">
        <ShoppingCart className="h-4 w-4 text-black" />
      </Button>
    );
  };

  return (
    <div className={`${theme === "light" ? "bg-gray-100 text-black" : "bg-slate-500 text-gray-300"} min-h-screen`}>
      <Navbar label1={hLabel1} label2={hLabel2} />
      <BookDetail book={book} genre={genre} author={author} />
    </div>
  );
}
