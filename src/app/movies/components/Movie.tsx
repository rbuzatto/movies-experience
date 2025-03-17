import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

type MovieProps = {
  title: string
  posterUrl?: string
  rating?: number
  id: string
}

export const Movie = ({ title, posterUrl, rating, id }: MovieProps) => (
  <Card className="w-xl p-4 flex flex-row h-48">
    {posterUrl ? (
      <Image style={{ objectFit: 'contain' }} src={posterUrl} alt={''} width={120} height={60} />
    ) : (
      <div className="w-[120px] bg-gray-100" />
    )}
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl">{title}</h2>
      {rating ? <p className="text-md">Rating: {rating}</p> : null}
      <Link
        className="mt-auto text-amber-900 font-semibold underline hover:text-amber-700"
        href={`/movies/${id}`}
      >
        Details
      </Link>
    </div>
  </Card>
)
