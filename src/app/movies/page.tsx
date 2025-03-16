'use client'

import type { ChangeEvent } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Suspense, useState } from 'react'
import { PageSelector } from './components/PageSelector'
import { useGetGenres } from './hooks/useGetGenres'
import { useGetMovies } from './hooks/useGetMovies'
import Loading from './Loading'
import { MoviesList } from './components/MoviesList'

export default function MoviesPage() {
  const [genre, setGenre] = useState('')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const resetPageNumber = () => setCurrentPage(1)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    resetPageNumber()
  }

  const { data: moviesData } = useGetMovies({ search, genre, currentPage })
  const { data: genresData } = useGetGenres()

  const genres = genresData?.data.map(({ title }) => title)
  const onSelectGenre = (genre: string) => {
    setGenre(genre)
    resetPageNumber()
  }
  const hasPages = moviesData?.totalPages || 0 > 1
  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < (moviesData?.totalPages || 0)
  const totalPages = moviesData?.totalPages || 0

  return (
    <main className="flex flex-col mx-auto p-12 gap-12 items-center">
      <div className="flex justify-between w-xl">
        <Input className="w-3/5" value={search} onChange={onChange} placeholder={'Search'} />
        <Select onValueChange={onSelectGenre}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pick Genre" />
          </SelectTrigger>
          <SelectContent>
            {genres?.map(genre => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Suspense fallback={<Loading />}>
        <MoviesList search={search} genre={genre} currentPage={currentPage} />
      </Suspense>
      {hasPages ? (
        <PageSelector
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={() => setCurrentPage(currentPage - 1)}
          onNextPage={() => setCurrentPage(currentPage + 1)}
        />
      ) : null}
    </main>
  )
}
