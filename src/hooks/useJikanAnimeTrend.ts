import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getJikanTrendingAnime } from '@/api/jikan/anime/trend'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { useAuth } from '@/providers/Auth'
import { IJikanAnime } from '@/types/JikanAnime'

export const useJikanAnimeTrend = () => {
  const { getRecommendSourceId } = useRecommendSources()
  const recommendSourceId = getRecommendSourceId(['jikan', 'anime'])

  const { user } = useAuth()
  const userId =
    user?.UserAttributes.find(({ Name }) => Name === 'sub')?.Value || ''

  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const params = { page, limit, recommendSourceId, userId }

  const { data, isLoading, isError, refetch } = useQuery<IJikanAnime>({
    queryKey: ['jikan-anime-trend', params],
    queryFn: () => getJikanTrendingAnime(params),
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
