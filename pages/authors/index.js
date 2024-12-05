import Link from 'next/link'
import useSWR from 'swr'
import { ArrowLeft, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Navbar from '@/components/common/navbar'
import AppSpinner from '@/components/common/spinner'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function AuthorsPage() {

  const { data, error } = useSWR('/api/authors', fetcher)

  if (!data && !error) {
    return <AppSpinner />
  }

  if (error) {
    return <div className="text-center text-red-500 py-12">Failed to load authors.</div>
  }

  const authors = data?.authors || [];

  const hLabel1 = () => {
    return (
      <Link href="/" className="flex items-center text-gray-900 hover:text-gray-600">
        <ArrowLeft className="mr-2" />
        <span className="text-lg font-semibold">Back to Home</span>
      </Link>
    )
  }

  const hLabel2 = () => {
    return (
      <h1 className="text-3xl font-bold text-gray-900">Our Authors</h1>

    )
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar label1={hLabel1} label2={hLabel2} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-8">
            <p className="text-xl text-gray-600">
              Discover the talented writers behind our collection. Click on an author to view their details and books.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
              <Card key={author.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex flex-col items-center">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={`/placeholder.svg?height=96&width=96&text=${author.name.split(' ').map((n) => n[0]).join('')}`} alt={author.name} />
                    <AvatarFallback><User className="w-12 h-12" /></AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4 text-2xl font-bold text-center">{author.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600">{author.biography}</p>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Link href={`/authors/${author.id}`} passHref>
                    <Button>View Author Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          {authors.length === 0 && (
            <div className="text-center text-gray-500 mt-12">
              <p className="text-2xl">No authors found.</p>
              <p className="mt-2">Check back later for updates to our author list.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
