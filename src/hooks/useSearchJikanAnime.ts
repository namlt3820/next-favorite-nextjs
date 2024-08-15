import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getJikanAnime } from '@/api/jikan/anime/search'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { useAuth } from '@/providers/Auth'
import { IJikanAnime } from '@/types/JikanAnime'

export const useSearchJikanAnime = () => {
  const { getRecommendSourceId } = useRecommendSources()
  const recommendSourceId = getRecommendSourceId(['jikan', 'anime'])

  const { user } = useAuth()
  const userId =
    user?.UserAttributes.find(({ Name }) => Name === 'sub')?.Value || ''

  const searchParams = useSearchParams()
  const query = decodeURIComponent(searchParams.get('query') || '')
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  const params = { query, page, limit, recommendSourceId, userId }

  const { data, isLoading, isError, refetch } = useQuery<IJikanAnime>({
    queryKey: ['jikan-anime-search', params],
    queryFn: () => getJikanAnime(params),
    retry: false,
  })

  return {
    data,
    isLoading,
    isError,
    refetch,
  }
}
