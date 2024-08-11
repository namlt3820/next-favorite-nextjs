import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getTraktShows } from '@/api/trakt/show/search'
import { IPagination } from '@/types/Pagination'
import { ITraktShow } from '@/types/TraktShow'

export const useSearchTraktShow = () => {
  const searchParams = useSearchParams()
  const query = decodeURIComponent(searchParams.get('query') || '')
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const params = { query, page, limit }

  const { data, isLoading, isError, refetch } = useQuery<
    IPagination<ITraktShow>
  >({
    queryKey: ['trakt-show-search', params],
    queryFn: () => getTraktShows(params),
    retry: false,
  })

  return {
    data,
    isLoading,
    isError,
    refetch,
  }
}
