import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { getTraktShowRecommend as getTraktShowRecommendApi } from '@/api/trakt/show/recommend'
import { TraktShowRecommendAction } from '@/app/[resource]/[media]/[service]/trakt/show/recommend/trakt-show-recommend-action'
import { TraktShow } from '@/components/trakt/trakt-show'
import { Button } from '@/components/ui/button'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { scrollToTop } from '@/lib/scrollToTop'
import { Show } from '@/types/TraktShow'

export const TraktShowRecommend = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [shows, setShows] = useState<Show[]>([])
  const { getRecommendSourceId } = useRecommendSources()
  const recommendSourceId = getRecommendSourceId(['trakt', 'show'])

  const getTraktShowRecommend = useCallback(async () => {
    try {
      if (!recommendSourceId) {
        return
      }
      setIsLoading(true)

      const shows = await getTraktShowRecommendApi({
        recommendSourceId,
      })

      if (shows.length) {
        setShows(shows)
      }

      setIsLoading(false)
    } catch (error) {
      console.log({ error })
      setIsLoading(false)
      setIsError(true)
    }
  }, [recommendSourceId])

  useEffect(() => {
    getTraktShowRecommend()
  }, [getTraktShowRecommend])

  const handleRefreshButton = () => {
    getTraktShowRecommend()
    scrollToTop()
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        Loading your recommended shows from Trakt API. Please wait.{' '}
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        An error occurred while loading your recommended shows from Trakt API.
        Please try again later or provide feedback.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        To see different recommended shows, please add some shows to your
        favorites first, or click the refresh button below.
      </div>
      <Button className="self-start" onClick={handleRefreshButton}>
        Refresh
      </Button>
      <div className="flex flex-wrap gap-4">
        {shows.map((show) => (
          <TraktShow
            key={show.ids.trakt}
            show={{ show }}
            actionComponent={<TraktShowRecommendAction show={{ show }} />}
          ></TraktShow>
        ))}
      </div>
      {shows.length ? (
        <Button className="self-start" onClick={handleRefreshButton}>
          Refresh
        </Button>
      ) : null}
    </div>
  )
}
