import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import { getTraktShows } from '@/api/trakt/show/search'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { useAuth } from '@/providers/Auth'
import { IPagination } from '@/types/Pagination'
import { ITraktShow } from '@/types/TraktShow'

export const useSearchTraktShow = () => {
  const { getRecommendSourceId } = useRecommendSources()
  const recommendSourceId = getRecommendSourceId(['trakt', 'show'])

  const { user } = useAuth()
  const userId =
    user?.UserAttributes.find(({ Name }) => Name === 'sub')?.Value || ''

  const searchParams = useSearchParams()
  const query = decodeURIComponent(searchParams.get('query') || '')
  const page = Number(searchParams.get('page')) || 1
  const limit = Number(searchParams.get('limit')) || 10

  const params = { query, page, limit, recommendSourceId, userId }

  const { data, isLoading, isError, refetch } = useQuery<
    IPagination<ITraktShow>
  >({
    queryKey: ['trakt-show-search', params],
    queryFn: () => getTraktShows(params),
    retry: false,
  })

  return {
    data,
    isLoading,
    isError,
    refetch,
  }
}
