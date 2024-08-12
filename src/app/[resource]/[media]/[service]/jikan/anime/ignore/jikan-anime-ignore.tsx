import { ChevronRight, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getIgnores as getIgnoresApi } from '@/api/ignore/list'
import {
  GetJikanAnimeDetailResponse,
  getJikanAnimeDetail,
} from '@/api/jikan/anime/detail'
import { JikanAnime } from '@/components/jikan/jikan-anime'
import { Button } from '@/components/ui/button'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { scrollToTop } from '@/lib/scrollToTop'
import { IFavorite } from '@/types/Favorite'
import { ILastEvaluatedKey } from '@/types/LastEvaluatedKey'

import { JikanAnimeIgnoreAction } from './jikan-anime-ignore-action'

const sortAnimeListResponse = ({
  items,
  animeList,
}: {
  items: IFavorite[]
  animeList: GetJikanAnimeDetailResponse[]
}) => {
  const sortedAnimeResponse = []
  for (const item of items) {
    const anime = animeList.find(
      (anime) => anime.itemId === Number(item.itemId)
    )
    if (anime) {
      sortedAnimeResponse.push({
        anime,
        id: item.id,
      })
    }
  }

  return sortedAnimeResponse
}

export const JikanAnimeIgnore = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [lastKey, setLastKey] = useState<ILastEvaluatedKey | undefined>(
    undefined
  )
  const [animeList, setAnimeList] = useState<
    { id: string; anime: GetJikanAnimeDetailResponse }[]
  >([])
  const { getRecommendSourceId } = useRecommendSources()
  const recommendSourceId = getRecommendSourceId(['jikan', 'anime'])

  useEffect(() => {
    const getIgnores = async () => {
      try {
        if (!recommendSourceId) {
          return
        }
        setIsLoading(true)

        const { items, lastEvaluatedKey } = await getIgnoresApi({
          recommendSourceId,
          limit: 3,
        })

        if (items.length) {
          const itemIds = items.map(({ itemId }) => Number(itemId))
          const animeListResponse = await getJikanAnimeDetail({ itemIds })
          const sortedAnimeListResponse = sortAnimeListResponse({
            items,
            animeList: animeListResponse,
          })
          setAnimeList(sortedAnimeListResponse)
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

    getIgnores()
  }, [recommendSourceId])

  const handleClickNext = async () => {
    if (!recommendSourceId) {
      return
    }

    scrollToTop()
    try {
      setIsLoading(true)
      const { items, lastEvaluatedKey } = await getIgnoresApi({
        recommendSourceId,
        lastKey,
        limit: 3,
      })

      if (items.length) {
        const itemIds = items.map(({ itemId }) => Number(itemId))
        const animeListResponse = await getJikanAnimeDetail({ itemIds })
        const sortedAnimeListResponse = sortAnimeListResponse({
          items,
          animeList: animeListResponse,
        })
        setAnimeList(sortedAnimeListResponse)
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
      <div className="flex items-center gap-3">
        Loading your ignored anime from Jikan API. Please wait.{' '}
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        An error occurred while loading your ignored anime from Jikan API.
        Please try again later or provide feedback.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        {animeList.map((anime) => {
          const {
            anime: { data },
            id,
          } = anime

          return (
            <JikanAnime
              key={data.mal_id}
              anime={data}
              actionComponent={<JikanAnimeIgnoreAction id={id} />}
            ></JikanAnime>
          )
        })}
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
