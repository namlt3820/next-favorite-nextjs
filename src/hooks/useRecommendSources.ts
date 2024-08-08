import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { CreateFavoriteParams, createFavorite } from '@/api/favorite/create'
import { getRecommendSources } from '@/api/recommend-source/list'
import { useToast } from '@/components/ui/use-toast'
import { TRY_AGAIN } from '@/lib/messages'
import { IRecommendSource } from '@/types/RecommendSource'

export const useRecommendSources = () => {
  const { toast } = useToast()
  const { data, isLoading, isError, refetch } = useQuery<IRecommendSource[]>({
    queryKey: ['recommend-sources'],
    queryFn: () => getRecommendSources(),
    staleTime: 1000 * 60 * 60,
  })

  const createFavoriteMutation = useMutation({
    mutationFn: (params: CreateFavoriteParams) => createFavorite(params),
    onError: () => {
      toast({
        title: 'Create favorite item failed',
        description: TRY_AGAIN,
      })
    },
    onSuccess: () => {
      toast({
        title: 'Create favorite item successfully',
      })
    },
  })

  const addToFavorite = async ({
    keywords,
    itemId,
  }: {
    keywords: string[]
    itemId: string
  }) => {
    const recommendSourceId = getRecommendSourceId(keywords)

    if (itemId && recommendSourceId) {
      await createFavoriteMutation.mutate({ recommendSourceId, itemId })
    }
  }

  const getRecommendSourceId = (keywords: string[]) => {
    return data?.find((source) =>
      keywords.every((item) => source.name.toLowerCase().includes(item))
    )?.recommendSourceId
  }

  return {
    addToFavorite,
    getRecommendSourceId,
  }
}
