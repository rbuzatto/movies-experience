import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PageHome() {
  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-4 bg-gray-50">
      <h1 className="text-5xl font-bold text-cyan-700">
        Get Amazed and find the pictures you love!
      </h1>
      <p className="text-xl text-gray-600 w-3/4 text-center">
        Find your favorite movie and enjoy the experience. The best movies are here! A unique
        collection of movies you love to watch. Enjoy the experience!
      </p>
      <Button variant={'default'} className="mt-4 p-8 text-3xl">
        <Link href={'/movies'}>Start</Link>
      </Button>
    </main>
  )
}
