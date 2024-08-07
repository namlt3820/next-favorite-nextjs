import { capitalize } from 'lodash'

import { TraktMovieSearch } from '@/app/[resource]/[media]/[service]/trakt/movie/trakt-movie-search'
import { TraktMovieTrend } from '@/app/[resource]/[media]/[service]/trakt/movie/trakt-movie-trend'

export const ResourceContent = ({
  resource,
  media,
  service,
}: {
  resource?: string
  media?: string
  service?: string
}) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        {capitalize(resource)} / {capitalize(media)} / {capitalize(service)}
      </h1>

      {resource === 'trakt' && media === 'movies' && service === 'trending' && (
        <TraktMovieTrend />
      )}

      {resource === 'trakt' && media === 'movies' && service === 'search' && (
        <TraktMovieSearch />
      )}
    </>
  )
}
