import { MOVIES } from '@/endpoints'
import { getData } from '@/services/httpClient'
import { useQuery } from '@tanstack/react-query'

type Movie = {
  id: string
  posterUrl: string
  rating: number
  title: string
}

type Genre = {
  id: string
  title: string
  movies: Pick<Movie, 'id'>[]
}

type GenreData = {
  data: Genre[]
  totalPages: number
}

export const useGetGenres = () => {
  return useQuery<GenreData>({
    queryKey: ['genre', 'movies'],
    queryFn: () => getData(MOVIES.GET_GENRES),
  })
}
