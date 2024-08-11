import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getTraktTrendingShows } from '@/api/trakt/show/trend'
import { IPagination } from '@/types/Pagination'
import { ITraktShow } from '@/types/TraktShow'

export const useTraktShowTrend = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const params = { page, limit }

  const { data, isLoading, isError, refetch } = useQuery<
    IPagination<ITraktShow>
  >({
    queryKey: ['trakt-show-trend', params],
    queryFn: () => getTraktTrendingShows(params),
    retry: false,
    staleTime: 1000 * 60 * 60,
  })

  return {
    data,
    isLoading,
    isError,
    refetch,
  }
}
