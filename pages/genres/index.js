import Link from 'next/link'
import { ArrowLeft, BookOpen } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import path from 'path';
import fs from 'fs';
import Navbar from '@/components/common/navbar';
import { useTheme } from '@/theme.provider';


export default function GenresPage(props) {
  const { genres } = props;

  const { theme } = useTheme();


  const hLabel1 = () => {
    return (
      <Link href="/" className="flex items-center">
        <ArrowLeft className="mr-2" />
        <span className="text-lg font-semibold">Back to Home</span>
      </Link>
    )
  }

  const hLabel2 = () => {
    return (
      <h1 className="text-3xl font-bold">Book Genres</h1>

    )
  }

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-gray-100 text-black" : "bg-slate-500 text-gray-300"}`}>

      <Navbar label1={hLabel1} label2={hLabel2} />

      <main className={`max-w-7xl mx-auto py-6 sm:px-6 lg:px-8`}>
        <div className="px-4 py-6 sm:px-0">
          <div className="text-center mb-8">
            <p className={`text-xl ${theme === "light" ? "text-gray-600" : "text-white"}`}>
              Explore our collection by selecting a genre below. Click on any genre to view books in that category.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {genres.map((genre) => (
              <Card key={genre.id} className={`${theme === "light" ? "hover:shadow-lg transition-shadow duration-300" : "bg-slate-700 border-slate-500 text-white"}`}>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <BookOpen className="w-12 h-12 mb-4" />
                  <h2 className="text-2xl font-bold text-center">{genre.name}</h2>
                </CardContent>
                <CardFooter className="p-4">
                  <Link href={`/genres/${genre.id}`} passHref className="w-full">
                    <Button className="w-full">Explore {genre.name}</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps() {

  const filePath = path.join(process.cwd(), 'Data.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);
  const genres = data.genres;

  return {
    props: {
      genres
    },
  };
}
