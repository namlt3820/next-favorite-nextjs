import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getJikanTrendingAnime } from '@/api/jikan/anime/trend'
import { IJikanAnime } from '@/types/JikanAnime'

export const useJikanAnimeTrend = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const params = { page, limit }

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
