import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getTraktTrendingMovies } from '@/api/trakt/movie/trend'
import { Pagination } from '@/types/Pagination'
import { ITraktMovie } from '@/types/TraktMovie'

export const useTraktMovieTrend = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const params = { page, limit }

  const { data, isLoading, isError, refetch } = useQuery<
    Pagination<ITraktMovie>
  >({
    queryKey: ['trakt-movie-trend', params],
    queryFn: () => getTraktTrendingMovies(params),
  })

  return {
    data,
    isLoading,
    isError,
    refetch,
  }
}
