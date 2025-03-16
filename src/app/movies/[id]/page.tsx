import { getData } from '@/services/httpServer'
import Image from 'next/image'
import Link from 'next/link'

type MovieData = {
  id: string
  title: string
  posterUrl: string
  rating: string
  summary: string
  duration: string
  directors: string[]
  mainActors: string[]
  datePublished: string
  ratingValue: number
  bestRating: number
  worstRating: number
  writers: string[]
  genres: { id: string; title: string }[]
}
export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const {
    title,
    posterUrl,
    summary,
    duration,
    directors,
    mainActors,
    datePublished,
    ratingValue,
    writers,
    genres,
  } = await getData<MovieData>(`/movies/${id}`)
  const getPictureTime = duration.split('T')[1].split('H')
  const hours = getPictureTime[0]
  const minutes = getPictureTime[1].split('M')[0]
  const formattedDuration = `${hours}h ${minutes}m`
  const releaseYear = new Date(datePublished).getFullYear()

  return (
    <main className="flex flex-col items-center gap-12 mx-auto w-6xl p-12">
      <div className="flex gap-12 mx-auto p-12">
        <Image src={posterUrl} alt={title} width={240} height={240} />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p>
            <span className="font-semibold">Summary: </span>
            {summary}
          </p>
          <p>
            <span className="font-semibold">Length: </span>
            {formattedDuration}
          </p>
          {directors && (
            <p>
              <span className="font-semibold">Directors: </span>
              {directors.join(', ')}
            </p>
          )}
          {mainActors && (
            <p>
              <span className="font-semibold">Actors: </span>
              {mainActors.join(', ')}
            </p>
          )}
          <p>
            <span className="font-semibold">Released: </span>
            {releaseYear}
          </p>
          <p>
            <span className="font-semibold">Score: </span>
            {ratingValue}
          </p>
          {writers && (
            <p>
              <span className="font-semibold">Writers: </span>
              {writers.join(', ')}
            </p>
          )}
          {genres && (
            <p>
              <span className="font-semibold">Genres: </span>
              {genres.map(({ title }) => title).join(', ')}
            </p>
          )}
        </div>
      </div>
      <Link className="underline text-amber-900 hover:text-amber-700 text-2xl" href={'/movies'}>
        All Movies
      </Link>
    </main>
  )
}
