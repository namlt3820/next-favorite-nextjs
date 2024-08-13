import shuffle from 'lodash/shuffle'
import { useCallback, useEffect, useState } from 'react'

import {
  GetJikanAnimeDetailResponse,
  getJikanAnimeDetail,
} from '@/api/jikan/anime/detail'
import { getJikanAnimeRecommend as getJikanAnimeRecommendApi } from '@/api/jikan/anime/recommend'
import { JikanAnime } from '@/components/jikan/jikan-anime'
import { LoadingResource } from '@/components/loading-resource'
import { Button } from '@/components/ui/button'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { scrollToTop } from '@/lib/scrollToTop'

import { JikanAnimeRecommendAction } from './jikan-anime-recommend-action'

export const JikanAnimeRecommend = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [animeList, setAnimeList] = useState<GetJikanAnimeDetailResponse[]>([])
  const { getRecommendSourceId } = useRecommendSources()
  const recommendSourceId = getRecommendSourceId(['jikan', 'anime'])

  const getJikanAnimeRecommend = useCallback(async () => {
    try {
      if (!recommendSourceId) {
        return
      }
      setIsLoading(true)

      const recommendAnimeList = await getJikanAnimeRecommendApi({
        recommendSourceId,
      })

      // Jikan rate limiting
      const recommendAnimeListGetDetail = shuffle(recommendAnimeList).slice(
        0,
        3
      )

      if (recommendAnimeListGetDetail.length) {
        const itemIds = recommendAnimeListGetDetail.map(
          ({ entry: { mal_id } }) => mal_id
        )
        const animeListResponse = await getJikanAnimeDetail({ itemIds })
        setAnimeList(animeListResponse)
      }

      setIsLoading(false)
    } catch (error) {
      console.log({ error })
      setIsLoading(false)
      setIsError(true)
    }
  }, [recommendSourceId])

  useEffect(() => {
    getJikanAnimeRecommend()
  }, [getJikanAnimeRecommend])

  const handleRefreshButton = () => {
    getJikanAnimeRecommend()
    scrollToTop()
  }

  if (isLoading) {
    return (
      <LoadingResource message="Loading your recommended anime from Jikan API. Please wait." />
    )
  }

  if (isError) {
    return (
      <div>
        An error occurred while loading your recommended anime from Jikan API.
        Please try again later or provide feedback.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        To see different recommended anime, please add some anime to your
        favorites first, or click the refresh button below.
      </div>
      <Button className="self-start" onClick={handleRefreshButton}>
        Refresh
      </Button>
      <div className="flex flex-wrap gap-4">
        {animeList.map((anime) => (
          <JikanAnime
            key={anime.data.mal_id}
            anime={anime.data}
            actionComponent={<JikanAnimeRecommendAction anime={anime.data} />}
          ></JikanAnime>
        ))}
      </div>
      {animeList.length ? (
        <Button className="self-start" onClick={handleRefreshButton}>
          Refresh
        </Button>
      ) : null}
    </div>
  )
}
