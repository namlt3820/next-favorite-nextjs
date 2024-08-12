import { capitalize } from 'lodash'

import { JikanAnimeFavorite } from '@/app/[resource]/[media]/[service]/jikan/anime/favorite/jikan-anime-favorite'
import { JikanAnimeIgnore } from '@/app/[resource]/[media]/[service]/jikan/anime/ignore/jikan-anime-ignore'
import { JikanAnimeRecommend } from '@/app/[resource]/[media]/[service]/jikan/anime/recommend/jikan-anime-recommend'
import { JikanAnimeSearch } from '@/app/[resource]/[media]/[service]/jikan/anime/search/jikan-anime-search'
import { JikanAnimeTrend } from '@/app/[resource]/[media]/[service]/jikan/anime/trend/jikan-anime-trend'
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

enum Resource {
  trakt = 'trakt',
  jikan = 'jikan',
}

enum Media {
  movies = 'movies',
  shows = 'shows',
  anime = 'anime',
}

enum Service {
  trending = 'trending',
  search = 'search',
  favorite = 'favorite',
  recommend = 'recommend',
  ignore = 'ignore',
}

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

      {resource === Resource.trakt &&
        media === Media.movies &&
        service === Service.trending && <TraktMovieTrend />}

      {resource === Resource.trakt &&
        media === Media.movies &&
        service === Service.search && <TraktMovieSearch />}

      {resource === Resource.trakt &&
        media === Media.movies &&
        service === Service.favorite && <TraktMovieFavorite />}

      {resource === Resource.trakt &&
        media === Media.movies &&
        service === Service.recommend && <TraktMovieRecommend />}

      {resource === Resource.trakt &&
        media === Media.movies &&
        service === Service.ignore && <TraktMovieIgnore />}

      {resource === Resource.trakt &&
        media === Media.shows &&
        service === Service.trending && <TraktShowTrend />}

      {resource === Resource.trakt &&
        media === Media.shows &&
        service === Service.search && <TraktShowSearch />}

      {resource === Resource.trakt &&
        media === Media.shows &&
        service === Service.favorite && <TraktShowFavorite />}

      {resource === Resource.trakt &&
        media === Media.shows &&
        service === Service.recommend && <TraktShowRecommend />}

      {resource === Resource.trakt &&
        media === Media.shows &&
        service === Service.ignore && <TraktShowIgnore />}

      {resource === Resource.jikan &&
        media === Media.anime &&
        service === Service.trending && <JikanAnimeTrend />}

      {resource === Resource.jikan &&
        media === Media.anime &&
        service === Service.search && <JikanAnimeSearch />}

      {resource === Resource.jikan &&
        media === Media.anime &&
        service === Service.favorite && <JikanAnimeFavorite />}

      {resource === Resource.jikan &&
        media === Media.anime &&
        service === Service.recommend && <JikanAnimeRecommend />}

      {resource === Resource.jikan &&
        media === Media.anime &&
        service === Service.ignore && <JikanAnimeIgnore />}
    </>
  )
}
