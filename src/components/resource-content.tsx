import { capitalize } from 'lodash'

import { TraktMovieFavorite } from '@/app/[resource]/[media]/[service]/trakt/movie/favorite/trakt-movie-favorite'
import { TraktMovieIgnore } from '@/app/[resource]/[media]/[service]/trakt/movie/ignore/trakt-movie-ignore'
import { TraktMovieRecommend } from '@/app/[resource]/[media]/[service]/trakt/movie/recommend/trakt-movie-recommend'
import { TraktMovieSearch } from '@/app/[resource]/[media]/[service]/trakt/movie/search/trakt-movie-search'
import { TraktMovieTrend } from '@/app/[resource]/[media]/[service]/trakt/movie/trend/trakt-movie-trend'
import { TraktShowFavorite } from '@/app/[resource]/[media]/[service]/trakt/show/favorite/trakt-show-favorite'
import { TraktShowIgnore } from '@/app/[resource]/[media]/[service]/trakt/show/ignore/trakt-show-ignore'
import { TraktShowRecommend } from '@/app/[resource]/[media]/[service]/trakt/show/recommend/trakt-show-recommend'
import { TraktShowSearch } from '@/app/[resource]/[media]/[service]/trakt/show/search/trakt-show-search'
import { TraktShowTrend } from '@/app/[resource]/[media]/[service]/trakt/show/trend/trakt-show-trend'

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

      {resource === 'trakt' && media === 'movies' && service === 'ignore' && (
        <TraktMovieIgnore />
      )}

      {resource === 'trakt' && media === 'shows' && service === 'trending' && (
        <TraktShowTrend />
      )}

      {resource === 'trakt' && media === 'shows' && service === 'search' && (
        <TraktShowSearch />
      )}

      {resource === 'trakt' && media === 'shows' && service === 'favorite' && (
        <TraktShowFavorite />
      )}

      {resource === 'trakt' && media === 'shows' && service === 'recommend' && (
        <TraktShowRecommend />
      )}

      {resource === 'trakt' && media === 'shows' && service === 'ignore' && (
        <TraktShowIgnore />
      )}
    </>
  )
}
