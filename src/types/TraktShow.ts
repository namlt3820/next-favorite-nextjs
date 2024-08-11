export interface ITraktShow {
  watchers?: number
  show: Show
}

export interface Show {
  title: string
  year: number
  ids: Ids
  tagline: string
  overview: string
  first_aired: string
  airs: Airs
  runtime: number
  certification: string
  network: string
  country: string
  trailer: string
  homepage: string
  status: string
  rating: number
  votes: number
  comment_count: number
  updated_at: string
  language: string
  languages: string[]
  available_translations: string[]
  genres: string[]
  aired_episodes: number
  poster: string
}

export interface Ids {
  trakt: number
  slug: string
  tvdb: number
  imdb: string
  tmdb: number
  tvrage: any
}

export interface Airs {
  day: string
  time: string
  timezone: string
}
