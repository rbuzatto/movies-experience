import { Movie } from '@/app/movies/components/Movie'
import { render, screen } from '@testing-library/react'

const mockMovie = {
  title: 'Inception',
  posterUrl: '/poster.jpg',
  rating: 8.8,
  id: '123',
}

describe('Movie Component', () => {
  it('renders the movie title', () => {
    render(<Movie {...mockMovie} />)
    expect(screen.getByText('Inception')).toBeInTheDocument()
  })

  it('displays the poster image when `posterUrl` is provided', () => {
    render(<Movie {...mockMovie} />)
    const img = screen.getByAltText('')
    expect(img).toBeInTheDocument()
  })

  it('shows a placeholder when `posterUrl` is missing', () => {
    const { posterUrl, ...movieWithoutPoster } = mockMovie
    render(<Movie {...movieWithoutPoster} />)
    expect(screen.queryByAltText('')).not.toBeInTheDocument()
  })

  it('displays the rating when provided', () => {
    render(<Movie {...mockMovie} />)
    expect(screen.getByText('Rating: 8.8')).toBeInTheDocument()
  })

  it('does not render rating when not provided', () => {
    const { rating, ...movieWithoutRating } = mockMovie
    render(<Movie {...movieWithoutRating} />)
    expect(screen.queryByText('Rating:')).not.toBeInTheDocument()
  })

  it('contains the correct link to movie details', () => {
    render(<Movie {...mockMovie} />)
    const link = screen.getByRole('link', { name: 'Details' })
    expect(link).toHaveAttribute('href', `/movies/${mockMovie.id}`)
  })
})
