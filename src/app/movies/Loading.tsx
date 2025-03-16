import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="w-xl h-48 flex flex-row gap-4 p-4 rounded" key={index}>
          <Skeleton className="h-full shrink-0 w-[120px] rounded-xl" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[80px] mt-auto" />
          </div>
        </div>
      ))}
    </div>
  )
}
