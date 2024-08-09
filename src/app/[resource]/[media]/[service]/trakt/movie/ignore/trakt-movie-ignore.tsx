import { ChevronRight, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getIgnores as getIgnoresApi } from '@/api/ignore/list'
import {
  GetTraktMovieDetailResponse,
  getTraktMovieDetail,
} from '@/api/trakt/movie/detail'
import { TraktMovieIgnoreAction } from '@/app/[resource]/[media]/[service]/trakt/movie/ignore/trakt-movie-ignore-action'
import { TraktMovie } from '@/components/trakt/trakt-movie'
import { Button } from '@/components/ui/button'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { scrollToTop } from '@/lib/scrollToTop'
import { ILastEvaluatedKey } from '@/types/LastEvaluatedKey'

const sortMoviesResponse = ({
  itemIds,
  movies,
}: {
  itemIds: number[]
  movies: GetTraktMovieDetailResponse[]
}) => {
  const sortedMoviesResponse = []
  for (const itemId of itemIds) {
    const movie = movies.find((movie) => movie.itemId === itemId)
    sortedMoviesResponse.push(movie!)
  }

  return sortedMoviesResponse
}

export const TraktMovieIgnore = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [lastKey, setLastKey] = useState<ILastEvaluatedKey | undefined>(
    undefined
  )
  const [movies, setMovies] = useState<GetTraktMovieDetailResponse[]>([])
  const { getRecommendSourceId } = useRecommendSources()
  const recommendSourceId = getRecommendSourceId(['trakt', 'movie'])

  useEffect(() => {
    const getIgnores = async () => {
      try {
        if (!recommendSourceId) {
          return
        }
        setIsLoading(true)

        const { items, lastEvaluatedKey } = await getIgnoresApi({
          recommendSourceId,
        })

        if (items.length) {
          const itemIds = items.map(({ itemId }) => Number(itemId))
          const moviesResponse = await getTraktMovieDetail({ itemIds })
          const sortedMoviesResponse = sortMoviesResponse({
            itemIds,
            movies: moviesResponse,
          })
          setMovies(sortedMoviesResponse)
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
      })

      if (items.length) {
        const itemIds = items.map(({ itemId }) => Number(itemId))
        const moviesResponse = await getTraktMovieDetail({ itemIds })
        const sortedMoviesResponse = []
        for (const itemId of itemIds) {
          const movie = moviesResponse.find(
            (repsonse) => repsonse.itemId === itemId
          )
          sortedMoviesResponse.push(movie!)
        }
        setMovies(sortedMoviesResponse)
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
        Loading your ignored movies from the Trakt API. Please wait.{' '}
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        An error occurred while loading your ignored movies from the Trakt API.
        Please try again later or provide feedback.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        {movies.map((movie) => (
          <TraktMovie
            key={movie.itemId}
            movie={{ movie: movie.data }}
            actionComponent={
              <TraktMovieIgnoreAction movie={{ movie: movie.data }} />
            }
          ></TraktMovie>
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
