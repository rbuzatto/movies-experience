import { getData } from '@/services/httpClient'
import { useQuery } from '@tanstack/react-query'

type Movie = {
  id: string
  posterUrl: string
  rating: number
  title: string
}

type MovieQuery = {
  data: Movie[]
  totalPages: number
}

type UseGetMoviesProps = {
  search: string
  genre: string
  currentPage: number
}

export const useGetMovies = ({ search, genre, currentPage }: UseGetMoviesProps) => {
  return useQuery({
    queryKey: ['movies', search, genre, currentPage],
    queryFn: () =>
      getData<MovieQuery>('/movies?search={0}&genre={1}&page={2}', [
        search,
        genre,
        currentPage.toString(),
      ]),
  })
}
