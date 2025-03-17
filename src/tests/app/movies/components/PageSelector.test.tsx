import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PageSelector } from '@/app/movies/components/PageSelector'
import { vi } from 'vitest'

const defaultProps = {
  hasPreviousPage: true,
  hasNextPage: true,
  currentPage: 2,
  totalPages: 5,
  onPreviousPage: vi.fn(),
  onNextPage: vi.fn(),
}

describe('PageSelector Component', () => {
  it('renders current page and total pages', () => {
    render(<PageSelector {...defaultProps} />)
    expect(screen.getByLabelText('Current Page 2 of 5')).toBeInTheDocument()
  })

  it('disables previous button on the first page', () => {
    render(<PageSelector {...defaultProps} hasPreviousPage={false} currentPage={1} />)
    expect(screen.getByLabelText('Previous Page')).toBeDisabled()
  })

  it('disables next button on the last page', () => {
    render(<PageSelector {...defaultProps} hasNextPage={false} currentPage={5} />)
    expect(screen.getByLabelText('Next Page')).toBeDisabled()
  })

  it('calls `onPreviousPage` when clicking previous button', async () => {
    render(<PageSelector {...defaultProps} />)
    const prevButton = screen.getByLabelText('Previous Page')

    await userEvent.click(prevButton)
    expect(defaultProps.onPreviousPage).toHaveBeenCalledTimes(1)
  })

  it('calls `onNextPage` when clicking next button', async () => {
    render(<PageSelector {...defaultProps} />)
    const nextButton = screen.getByLabelText('Next Page')

    await userEvent.click(nextButton)
    expect(defaultProps.onNextPage).toHaveBeenCalledTimes(1)
  })
})
