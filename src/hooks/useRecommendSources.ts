import { useQuery } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'

import { CreateFavoriteParams, createFavorite } from '@/api/favorite/create'
import { DeleteFavoriteParams, deleteFavorite } from '@/api/favorite/delete'
import { CreateIgnoreParams, createIgnore } from '@/api/ignore/create'
import { DeleteIgnoreParams, deleteIgnore } from '@/api/ignore/delete'
import { getRecommendSources } from '@/api/recommend-source/list'
import { useToast } from '@/components/ui/use-toast'
import { TRY_AGAIN } from '@/lib/messages'
import { IRecommendSource } from '@/types/RecommendSource'

export const useRecommendSources = () => {
  const { toast } = useToast()
  const { data } = useQuery<IRecommendSource[]>({
    queryKey: ['recommend-sources'],
    queryFn: () => getRecommendSources(),
    staleTime: 1000 * 60 * 60,
  })

  /**
   * create favorite
   */
  const createFavoriteMutation = useMutation({
    mutationFn: (params: CreateFavoriteParams) => createFavorite(params),
    onError: (error) => {
      toast({
        title: 'Create favorite item failed',
        description: error.message || TRY_AGAIN,
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

  /**
   * create ignore
   */
  const createIgnoreMutation = useMutation({
    mutationFn: (params: CreateIgnoreParams) => createIgnore(params),
    onError: (error) => {
      toast({
        title: 'Create ignored item failed',
        description: error.message || TRY_AGAIN,
      })
    },
    onSuccess: () => {
      toast({
        title: 'Create ignored item successfully',
      })
    },
  })

  const addToIgnore = async ({
    keywords,
    itemId,
  }: {
    keywords: string[]
    itemId: string
  }) => {
    const recommendSourceId = getRecommendSourceId(keywords)

    if (itemId && recommendSourceId) {
      await createIgnoreMutation.mutate({ recommendSourceId, itemId })
    }
  }

  /**
   * delete favorite
   */
  const deleteFavoriteMutation = useMutation({
    mutationFn: (params: DeleteFavoriteParams) => deleteFavorite(params),
    onError: (error) => {
      toast({
        title: 'Remove favorite item failed',
        description: error.message || TRY_AGAIN,
      })
    },
    onSuccess: () => {
      toast({
        title: 'Remove favorite item successfully',
      })
      location.reload()
    },
  })

  const removeFromFavorite = async ({ id }: { id: string }) => {
    if (id) {
      deleteFavoriteMutation.mutate({ id })
    }
  }

  /**
   * delete ignore
   */
  const deleteIgnoreMutation = useMutation({
    mutationFn: (params: DeleteIgnoreParams) => deleteIgnore(params),
    onError: (error) => {
      toast({
        title: 'Remove ignored item failed',
        description: error.message || TRY_AGAIN,
      })
    },
    onSuccess: () => {
      toast({
        title: 'Remove ignored item successfully',
      })
      location.reload()
    },
  })

  const removeFromIgnore = async ({ id }: { id: string }) => {
    if (id) {
      deleteIgnoreMutation.mutate({ id })
    }
  }

  const getRecommendSourceId = (keywords: string[]) => {
    return data?.find((source) =>
      keywords.every((item) => source.name.toLowerCase().includes(item))
    )?.recommendSourceId
  }

  return {
    getRecommendSourceId,
    addToFavorite,
    createFavoriteMutation,
    addToIgnore,
    createIgnoreMutation,
    removeFromFavorite,
    deleteFavoriteMutation,
    removeFromIgnore,
    deleteIgnoreMutation,
  }
}
