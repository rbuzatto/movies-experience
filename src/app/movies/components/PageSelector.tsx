import { Button } from '@/components/ui/button'
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react'

type PageSelectorProps = {
  hasPreviousPage: boolean
  hasNextPage: boolean
  currentPage: number
  totalPages: number
  onPreviousPage: () => void
  onNextPage: () => void
}
export const PageSelector = ({
  hasPreviousPage,
  hasNextPage,
  currentPage,
  totalPages,
  onPreviousPage,
  onNextPage,
}: PageSelectorProps) => {
  return (
    <div className="flex gap-3 items-center mx-auto">
      <Button
        disabled={!hasPreviousPage}
        variant={'outline'}
        onClick={onPreviousPage}
        aria-label="Previous Page"
      >
        <ArrowBigLeft aria-hidden />
      </Button>
      <span className="font-bold" aria-label={`Current Page ${currentPage} of ${totalPages}`}>
        {currentPage} / {totalPages}
      </span>
      <Button
        disabled={!hasNextPage}
        variant={'outline'}
        onClick={onNextPage}
        aria-label="Next Page"
      >
        <ArrowBigRight aria-hidden />
      </Button>
    </div>
  )
}
