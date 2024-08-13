import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getFavorites as getFavoritesApi } from '@/api/favorite/list'
import {
  GetTraktShowDetailResponse,
  getTraktShowDetail,
} from '@/api/trakt/show/detail'
import { TraktShowFavoriteAction } from '@/app/[resource]/[media]/[service]/trakt/show/favorite/trakt-show-favorite-action'
import { LoadingResource } from '@/components/loading-resource'
import { TraktShow } from '@/components/trakt/trakt-show'
import { Button } from '@/components/ui/button'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { scrollToTop } from '@/lib/scrollToTop'
import { IFavorite } from '@/types/Favorite'
import { ILastEvaluatedKey } from '@/types/LastEvaluatedKey'

const sortShowsResponse = ({
  items,
  shows,
}: {
  items: IFavorite[]
  shows: GetTraktShowDetailResponse[]
}) => {
  const sortedShowsResponse = []
  for (const item of items) {
    const show = shows.find((show) => show.itemId === Number(item.itemId))
    if (show) {
      sortedShowsResponse.push({
        show,
        id: item.id,
      })
    }
  }

  return sortedShowsResponse
}

export const TraktShowFavorite = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [lastKey, setLastKey] = useState<ILastEvaluatedKey | undefined>(
    undefined
  )
  const [shows, setShows] = useState<
    { id: string; show: GetTraktShowDetailResponse }[]
  >([])
  const { getRecommendSourceId } = useRecommendSources()
  const recommendSourceId = getRecommendSourceId(['trakt', 'show'])

  useEffect(() => {
    const getFavorites = async () => {
      try {
        if (!recommendSourceId) {
          return
        }
        setIsLoading(true)

        const { items, lastEvaluatedKey } = await getFavoritesApi({
          recommendSourceId,
        })

        if (items.length) {
          const itemIds = items.map(({ itemId }) => Number(itemId))
          const showsResponse = await getTraktShowDetail({ itemIds })
          const sortedShowsResponse = sortShowsResponse({
            items,
            shows: showsResponse,
          })
          setShows(sortedShowsResponse)
        }

        if (lastEvaluatedKey) {
          setLastKey(lastEvaluatedKey)
        }
        setIsLoading(false)
      } catch (error) {
        console.log({ error })
        setIsLoading(false)
        setIsError(true)
      }
    }

    getFavorites()
  }, [recommendSourceId])

  const handleClickNext = async () => {
    if (!recommendSourceId) {
      return
    }

    scrollToTop()
    try {
      setIsLoading(true)
      const { items, lastEvaluatedKey } = await getFavoritesApi({
        recommendSourceId,
        lastKey,
      })

      if (items.length) {
        const itemIds = items.map(({ itemId }) => Number(itemId))
        const showsResponse = await getTraktShowDetail({ itemIds })
        const sortedShowsResponse = sortShowsResponse({
          items,
          shows: showsResponse,
        })
        setShows(sortedShowsResponse)
      }

      setLastKey(lastEvaluatedKey)
      setIsLoading(false)
    } catch (error) {
      console.log({ error })
      setIsLoading(false)
      setIsError(true)
    }
  }

  if (isLoading) {
    return (
      <LoadingResource message="Loading your favorite shows from Trakt API. Please wait." />
    )
  }

  if (isError) {
    return (
      <div>
        An error occurred while loading your favorite shows from Trakt API.
        Please try again later or provide feedback.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        {shows.map((show) => (
          <TraktShow
            key={show.id}
            show={{ show: show.show.data }}
            actionComponent={
              <TraktShowFavoriteAction
                show={{ show: show.show.data }}
                id={show.id}
              />
            }
          ></TraktShow>
        ))}
      </div>
      {lastKey ? (
        <div className="mx-auto w-full flex justify-center">
          <Button variant={'outline'} onClick={handleClickNext}>
            Next <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      ) : null}
    </div>
  )
}
