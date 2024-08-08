import { useEffect, useState } from 'react'

import { getFavorites as getFavoritesApi } from '@/api/favorite/list'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { IFavorite } from '@/types/Favorite'
import { ILastEvaluatedKey } from '@/types/LastEvaluatedKey'

export const TraktMovieFavorite = () => {
  const [favorites, setFavorites] = useState<IFavorite[]>([])
  const [lastKey, setLastKey] = useState<ILastEvaluatedKey | undefined>(
    undefined
  )
  const { getRecommendSourceId } = useRecommendSources()
  const recommendSourceId = getRecommendSourceId(['trakt', 'movie'])

  useEffect(() => {
    const getFavorites = async () => {
      if (recommendSourceId) {
        const { items, lastEvaluatedKey } = await getFavoritesApi({
          recommendSourceId,
          lastKey,
        })

        setFavorites(items)
        setLastKey(lastEvaluatedKey)
      }
    }

    getFavorites()
  }, [lastKey, recommendSourceId])

  return <div>Trakt Movie Favorite</div>
}
