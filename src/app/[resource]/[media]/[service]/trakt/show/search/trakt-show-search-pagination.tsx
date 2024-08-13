import { useSearchParams } from 'next/navigation'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { IPagination } from '@/types/Pagination'
import { ITraktShow } from '@/types/TraktShow'

export const TraktShowSearchPagination = ({
  data,
}: {
  data: IPagination<ITraktShow> | undefined
}) => {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''

  if (!data) return null

  const { limit, page, pageCount } = data
  const items: JSX.Element[] = []
  let path = `/trakt/shows/search?query=${query}&limit=${limit}&`

  if (page > 1) {
    items.push(
      <PaginationPrevious href={`${path}page=${page - 1}`}></PaginationPrevious>
    )
  }

  if (page) {
    items.push(
      <PaginationItem className="font-medium">
        {page} / {pageCount}
      </PaginationItem>
    )
  }

  if (page < pageCount) {
    items.push(
      <PaginationNext
        href={`${path}page=${page + 1}`}
        // onClick={scrollToTop}
      ></PaginationNext>
    )
  }

  return (
    <div className="mx-auto w-full p-4">
      <Pagination>
        <PaginationContent> {...items}</PaginationContent>
      </Pagination>
    </div>
  )
}
