import { useSearchParams } from 'next/navigation'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { scrollToTop } from '@/lib/scrollToTop'
import { IJikanAnime } from '@/types/JikanAnime'

export const JikanAnimeSearchPagination = ({
  data,
}: {
  data: IJikanAnime | undefined
}) => {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''

  if (!data) return null

  const {
    pagination: {
      last_visible_page,
      has_next_page,
      current_page,
      items: { per_page },
    },
  } = data
  const items: JSX.Element[] = []
  let path = `/jikan/anime/search?query=${query}&limit=${per_page}&`

  if (current_page > 1) {
    items.push(
      <PaginationPrevious
        href={`${path}page=${current_page - 1}`}
      ></PaginationPrevious>
    )
  }

  if (current_page) {
    items.push(
      <PaginationItem className="font-medium">
        {current_page} / {last_visible_page}
      </PaginationItem>
    )
  }

  if (has_next_page) {
    items.push(
      <PaginationNext
        href={`${path}page=${current_page + 1}`}
        onClick={scrollToTop}
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
