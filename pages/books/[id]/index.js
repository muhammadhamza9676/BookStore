import { useRouter } from 'next/router'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import BookDetail from '@/components/common/book.detail'
import fs from 'fs'
import path from 'path'
import Navbar from '@/components/common/navbar'
import { useTheme } from '@/theme.provider'

export default function BookDetailPage({ book, genre, author }) {
  const router = useRouter();
  const { theme } = useTheme();


  if (router.isFallback) {
    return <div>Loading...</div>
  }

  const hLabel1 = () => {
    return (
      <Link href="/books" className="flex items-center">
        <ArrowLeft className="mr-2" />
        <span className="text-lg font-semibold">Back to All Books</span>
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
      <BookDetail book={book} genre={genre} author={author} />
    </div>
  )
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'Data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const books = JSON.parse(jsonData).books

  const paths = books.map((book) => ({
    params: { id: book.id }
  }))

  return {
    paths,
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'Data.json')
  const jsonData = fs.readFileSync(filePath, 'utf-8')
  const books = JSON.parse(jsonData).books
  const genres = JSON.parse(jsonData).genres
  const authors = JSON.parse(jsonData).authors

  // Find the book with the matching ID
  const book = books.find((book) => book.id === params.id)

  if (!book) {
    return {
      notFound: true,
    }
  }

  const genre = genres.find((genre) => genre.id === book.genreId).name;
  const author = authors.find((author) => author.id === book.authorId).name;

  return {
    props: {
      book,
      genre,
      author
    },
    revalidate: 60,
  }
}
