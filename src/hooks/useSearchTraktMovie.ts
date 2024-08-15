import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getTraktMovies } from '@/api/trakt/movie/search'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { useAuth } from '@/providers/Auth'
import { IPagination } from '@/types/Pagination'
import { ITraktMovie } from '@/types/TraktMovie'

export const useSearchTraktMovie = () => {
  const { getRecommendSourceId } = useRecommendSources()
  const recommendSourceId = getRecommendSourceId(['trakt', 'movie'])

  const { user } = useAuth()
  const userId =
    user?.UserAttributes.find(({ Name }) => Name === 'sub')?.Value || ''

  const searchParams = useSearchParams()
  const query = decodeURIComponent(searchParams.get('query') || '')
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const params = { query, page, limit, recommendSourceId, userId }

  const { data, isLoading, isError, refetch } = useQuery<
    IPagination<ITraktMovie>
  >({
    queryKey: ['trakt-movie-search', params],
    queryFn: () => getTraktMovies(params),
    retry: false,
  })

  return {
    data,
    isLoading,
    isError,
    refetch,
  }
}
