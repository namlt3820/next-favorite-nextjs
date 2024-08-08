import { Loader2 } from 'lucide-react'

import { TraktMovieTrendAction } from '@/app/[resource]/[media]/[service]/trakt/movie/trend/trakt-movie-trend-action'
import { TraktMovieTrendPagination } from '@/app/[resource]/[media]/[service]/trakt/movie/trend/trakt-movie-trend-pagination'
import { TraktMovie } from '@/components/trakt/trakt-movie'
import { useTraktMovieTrend } from '@/hooks/useTraktMovieTrend'

export const TraktMovieTrend = () => {
  const { data, isLoading, isError } = useTraktMovieTrend()

  if (isLoading)
    return (
      <div className="flex items-center gap-3">
        Loading trending movies from the Trakt API. Please wait.{' '}
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )

  if (isError)
    return (
      <div>
        An error occurred while loading trending movies from the Trakt API.
        Please try again later or provide feedback.
      </div>
    )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        {data?.docs.map((movie) => (
          <TraktMovie
            key={movie.movie.ids.trakt}
            movie={movie}
            actionComponent={<TraktMovieTrendAction movie={movie} />}
          />
        ))}
      </div>
      <TraktMovieTrendPagination data={data} />
    </div>
  )
}
