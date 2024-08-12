import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getJikanAnime } from '@/api/jikan/anime/search'
import { IJikanAnime } from '@/types/JikanAnime'

export const useSearchJikanAnime = () => {
  const searchParams = useSearchParams()
  const query = decodeURIComponent(searchParams.get('query') || '')
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10
  const params = { query, page, limit }

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
