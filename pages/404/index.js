import Link from 'next/link'
import { Home } from 'lucide-react'

import { Button } from "@/components/ui/button"

export default function Custom404Page() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      <div className="absolute inset-0 bg-white"></div>
      <div
        className="absolute inset-0 bg-purple-300 transform -skew-y-12 origin-top-right"
        style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}
      ></div>

      <div className="relative z-10 text-center p-8 max-w-2xl">
        <h1 className="text-6xl font-bold mb-4 text-purple-600">404</h1>
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Oops! Page Not Found</h2>
        <p className="text-xl mb-8 text-gray-600">
          It seems the page you're looking for has vanished into thin air.
          Don't worry, even the best books have missing pages sometimes!
        </p>
        <Link href="/" passHref>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
            <Home className="mr-2 h-5 w-5" /> Return to Homepage
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-10 left-10 transform -rotate-12">
        <div className="w-16 h-24 bg-purple-300 rounded-lg shadow-lg"></div>
      </div>
      <div className="absolute top-10 right-10 transform rotate-12">
        <div className="w-20 h-28 bg-purple-400 rounded-lg shadow-lg"></div>
      </div>
    </div>
  )
}