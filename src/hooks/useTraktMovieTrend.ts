import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getTraktTrendingMovies } from '@/api/trakt/movie/trend'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { useAuth } from '@/providers/Auth'
import { IPagination } from '@/types/Pagination'
import { ITraktMovie } from '@/types/TraktMovie'

export const useTraktMovieTrend = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  const { getRecommendSourceId } = useRecommendSources()
  const recommendSourceId = getRecommendSourceId(['trakt', 'movie'])

  const { user } = useAuth()
  const userId =
    user?.UserAttributes.find(({ Name }) => Name === 'sub')?.Value || ''

  const params = { page, limit, recommendSourceId, userId }
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
