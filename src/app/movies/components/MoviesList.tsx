import { useGetMovies } from '../hooks/useGetMovies'
import Loading from '../Loading'
import { Movie } from './Movie'

type MoviesListProps = {
  search: string
  genre: string
  currentPage: number
}

export const MoviesList = ({ search, genre, currentPage }: MoviesListProps) => {
  const { data: moviesData, isLoading } = useGetMovies({ search, genre, currentPage })
  const movies = moviesData?.data

  if (isLoading) {
    return <Loading />
  }

  return (
    <ul className="flex flex-col gap-4">
      {movies?.map(movie => (
        <Movie
          key={movie.id}
          title={movie.title}
          posterUrl={movie.posterUrl}
          rating={movie.rating}
          id={movie.id}
        />
      ))}
    </ul>
  )
}
