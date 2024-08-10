import { ChevronRight, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { getFavorites as getFavoritesApi } from '@/api/favorite/list'
import {
  GetTraktMovieDetailResponse,
  getTraktMovieDetail,
} from '@/api/trakt/movie/detail'
import { TraktMovieFavoriteAction } from '@/app/[resource]/[media]/[service]/trakt/movie/favorite/trakt-movie-favorite-action'
import { TraktMovie } from '@/components/trakt/trakt-movie'
import { Button } from '@/components/ui/button'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { scrollToTop } from '@/lib/scrollToTop'
import { IFavorite } from '@/types/Favorite'
import { ILastEvaluatedKey } from '@/types/LastEvaluatedKey'

const sortMoviesResponse = ({
  items,
  movies,
}: {
  items: IFavorite[]
  movies: GetTraktMovieDetailResponse[]
}) => {
  const sortedMoviesResponse = []
  for (const item of items) {
    const movie = movies.find((movie) => movie.itemId === Number(item.itemId))
    if (movie) {
      sortedMoviesResponse.push({
        movie,
        id: item.id,
      })
    }
  }

  return sortedMoviesResponse
}

export const TraktMovieFavorite = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [lastKey, setLastKey] = useState<ILastEvaluatedKey | undefined>(
    undefined
  )
  const [movies, setMovies] = useState<
    { id: string; movie: GetTraktMovieDetailResponse }[]
  >([])
  const { getRecommendSourceId } = useRecommendSources()
  const recommendSourceId = getRecommendSourceId(['trakt', 'movie'])

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
          const moviesResponse = await getTraktMovieDetail({ itemIds })
          const sortedMoviesResponse = sortMoviesResponse({
            items,
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
        const moviesResponse = await getTraktMovieDetail({ itemIds })
        const sortedMoviesResponse = sortMoviesResponse({
          items,
          movies: moviesResponse,
        })
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
        Loading your favorite movies from the Trakt API. Please wait.{' '}
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        An error occurred while loading your favorite movies from the Trakt API.
        Please try again later or provide feedback.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        {movies.map((movie) => (
          <TraktMovie
            key={movie.id}
            movie={{ movie: movie.movie?.data }}
            actionComponent={
              <TraktMovieFavoriteAction
                movie={{ movie: movie.movie.data }}
                id={movie.id}
              />
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
