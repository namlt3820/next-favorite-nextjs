import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { getTraktMovieRecommend as getTraktMovieRecommendApi } from '@/api/trakt/movie/recommend'
import { TraktMovieRecommendAction } from '@/app/[resource]/[media]/[service]/trakt/movie/recommend/trakt-movie-recommend-action'
import { TraktMovie } from '@/components/trakt/trakt-movie'
import { Button } from '@/components/ui/button'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { scrollToTop } from '@/lib/scrollToTop'
import { Movie } from '@/types/TraktMovie'

export const TraktMovieRecommend = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [movies, setMovies] = useState<Movie[]>([])
  const { getRecommendSourceId } = useRecommendSources()
  const recommendSourceId = getRecommendSourceId(['trakt', 'movie'])

  const getTraktMovieRecommend = useCallback(async () => {
    try {
      if (!recommendSourceId) {
        return
      }
      setIsLoading(true)

      const movies = await getTraktMovieRecommendApi({
        recommendSourceId,
      })

      if (movies.length) {
        setMovies(movies)
      }

      setIsLoading(false)
    } catch (error) {
      console.log({ error })
      setIsLoading(false)
      setIsError(true)
    }
  }, [recommendSourceId])

  useEffect(() => {
    getTraktMovieRecommend()
  }, [getTraktMovieRecommend])

  const handleRefreshButton = () => {
    getTraktMovieRecommend()
    scrollToTop()
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        Loading your recommended movies from the Trakt API. Please wait.{' '}
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        An error occurred while loading your recommended movies from the Trakt
        API. Please try again later or provide feedback.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        To see different recommended movies, please add some movies to your
        favorites first, or click the refresh button below.
      </div>
      <Button className="self-start" onClick={handleRefreshButton}>
        Refresh
      </Button>
      <div className="flex flex-wrap gap-4">
        {movies.map((movie) => (
          <TraktMovie
            key={movie.ids.trakt}
            movie={{ movie }}
            actionComponent={<TraktMovieRecommendAction movie={{ movie }} />}
          ></TraktMovie>
        ))}
      </div>
      <Button className="self-start" onClick={handleRefreshButton}>
        Refresh
      </Button>
    </div>
  )
}
