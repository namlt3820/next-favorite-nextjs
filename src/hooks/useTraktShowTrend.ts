import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getTraktTrendingShows } from '@/api/trakt/show/trend'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { useAuth } from '@/providers/Auth'
import { IPagination } from '@/types/Pagination'
import { ITraktShow } from '@/types/TraktShow'

export const useTraktShowTrend = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  const { getRecommendSourceId } = useRecommendSources()
  const recommendSourceId = getRecommendSourceId(['trakt', 'show'])

  const { user } = useAuth()
  const userId =
    user?.UserAttributes.find(({ Name }) => Name === 'sub')?.Value || ''

  const params = { page, limit, recommendSourceId, userId }

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
