import React from 'react';
import { useState } from 'react'
import { Star, ShoppingCart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from '@/theme.provider';
const imageSRC = "/book.jpg"

const BookDetail = (props) => {
    const {book, genre, author} = props;
    const [quantity, setQuantity] = useState(1);
    const { theme } = useTheme();


  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
        <div className="flex items-center">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
          {hasHalfStar && (
            <div className="relative">
              <Star className="w-5 h-5 text-yellow-400" />
              <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
          ))}
          <span className="ml-2 text-sm text-gray-400">{rating.toFixed(1)}</span>
        </div>
      )
    }
  return (
    <main className={`max-w-7xl mx-auto py-6 sm:px-6 lg:px-8  `}>
        <div className="px-4 py-6 sm:px-0">
          <Card className={`overflow-hidden ${theme === "light" ?"bg-white text-black":"bg-slate-700 text-gray-200 border-slate-500"} `}>
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img className="h-96 w-full object-cover md:w-96" src={imageSRC} alt={book.title} />
              </div>
              <div className="p-8 w-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-3xl font-bold">{book.title}</CardTitle>
                      <Link href={`${book.id}/author`}><CardDescription className="mt-2 text-xl">by {author}</CardDescription></Link>
                    </div>
                    <Badge variant="secondary" className="text-blue-600 bg-blue-100 hover:bg-blue-200">{genre}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mt-2">{book.description}</p>
                  <div className="mt-4">{renderStars(book.rating)}</div>
                  <div className="mt-4 space-y-2">
                    <p><strong>Publication Date:</strong> {book.publicationDate}</p>
                    <p><strong>Page Count:</strong> {book.pageCount}</p>
                    <p><strong>ISBN:</strong> {book.isbn}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start space-y-4">
                  <div className="text-3xl font-bold">${book.price.toFixed(2)}</div>
                  <div className="flex items-center space-x-4">
                    <Button onClick={decrementQuantity} className="text-black" variant="outline" size="icon">-</Button>
                    <span className="text-xl">{quantity}</span>
                    <Button onClick={incrementQuantity} className="text-black" variant="outline" size="icon">+</Button>
                  </div>
                  <Button className="w-full md:w-auto" size="lg">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        </div>
      </main>
  )
}

export default BookDetail;
