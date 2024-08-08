import { capitalize } from 'lodash'

import { TraktMovieFavorite } from '@/app/[resource]/[media]/[service]/trakt/movie/favorite/trakt-movie-favorite'
import { TraktMovieRecommend } from '@/app/[resource]/[media]/[service]/trakt/movie/recommend/trakt-movie-recommend'
import { TraktMovieSearch } from '@/app/[resource]/[media]/[service]/trakt/movie/search/trakt-movie-search'
import { TraktMovieTrend } from '@/app/[resource]/[media]/[service]/trakt/movie/trend/trakt-movie-trend'

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

      {resource === 'trakt' && media === 'movies' && service === 'favorite' && (
        <TraktMovieFavorite />
      )}

      {resource === 'trakt' &&
        media === 'movies' &&
        service === 'recommend' && <TraktMovieRecommend />}
    </>
  )
}
