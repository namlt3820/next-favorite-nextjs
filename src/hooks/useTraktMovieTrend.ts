import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getTraktTrendingMovies } from '@/api/trakt/movie/trend'
import { IPagination } from '@/types/Pagination'
import { ITraktMovie } from '@/types/TraktMovie'

export const useTraktMovieTrend = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const params = { page, limit }

  const { data, isLoading, isError, refetch } = useQuery<
    IPagination<ITraktMovie>
  >({
    queryKey: ['trakt-movie-trend', params],
    queryFn: () => getTraktTrendingMovies(params),
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
