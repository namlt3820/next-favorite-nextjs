import Link from 'next/link'

import { scrollToTop } from '@/lib/scrollToTop'
import { cn } from '@/lib/utils'
import { useAuth } from '@/providers/Auth'

const Button = ({
  title,
  href,
  selected,
}: {
  title: string
  href: string
  selected: boolean
}) => {
  return (
    <button
      className={cn('w-full text-left  hover:bg-gray-200 rounded', {
        'bg-gray-200': selected,
      })}
      onClick={scrollToTop}
    >
      <Link href={href} className="px-4 py-2 w-full inline-block">
        {title}
      </Link>
    </button>
  )
}

const getResourcePath = (resource?: string, media?: string, service?: string) =>
  `/${resource}/${media}/${service}`

export const ResourceMenu = ({
  resource,
  media,
  service,
}: {
  resource?: string
  media?: string
  service?: string
}) => {
  const { user } = useAuth()

  return (
    <div className="w-64 p-4 space-y-4 border ">
      <div className="fixed z-10">
        <ul className="space-y-2">
          <li>
            <div className="w-full text-left px-4 py-2 rounded">
              Trakt Shows
            </div>
            <ul className="ml-6 mt-2 space-y-1">
              <li>
                <Button
                  href="/trakt/shows/trending"
                  selected={
                    getResourcePath(resource, media, service) ===
                    '/trakt/shows/trending'
                  }
                  title="Trending"
                ></Button>
              </li>
              <li>
                <Button
                  href="/trakt/shows/search"
                  selected={
                    getResourcePath(resource, media, service) ===
                    '/trakt/shows/search'
                  }
                  title="Search"
                ></Button>
              </li>
              {user ? (
                <>
                  <li>
                    <Button
                      href="/trakt/shows/recommend"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/trakt/shows/recommend'
                      }
                      title="Recommend"
                    ></Button>
                  </li>
                  <li>
                    <Button
                      href="/trakt/shows/favorite"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/trakt/shows/favorite'
                      }
                      title="Favorite"
                    ></Button>
                  </li>
                  <li>
                    <Button
                      href="/trakt/shows/ignore"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/trakt/shows/ignore'
                      }
                      title="Ignore"
                    ></Button>
                  </li>
                </>
              ) : null}
            </ul>
          </li>
          <li>
            <div className="w-full text-left px-4 py-2 rounded">
              Trakt Movies
            </div>
            <ul className="ml-6 mt-2 space-y-1">
              <li>
                <Button
                  href="/trakt/movies/trending"
                  selected={
                    getResourcePath(resource, media, service) ===
                    '/trakt/movies/trending'
                  }
                  title="Trending"
                ></Button>
              </li>
              <li>
                <Button
                  href="/trakt/movies/search"
                  selected={
                    getResourcePath(resource, media, service) ===
                    '/trakt/movies/search'
                  }
                  title="Search"
                ></Button>
              </li>
              {user ? (
                <>
                  <li>
                    <Button
                      href="/trakt/movies/recommend"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/trakt/movies/recommend'
                      }
                      title="Recommend"
                    ></Button>
                  </li>
                  <li>
                    <Button
                      href="/trakt/movies/favorite"
                      title="Favorite"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/trakt/movies/favorite'
                      }
                    ></Button>
                  </li>
                  <li>
                    <Button
                      href="/trakt/movies/ignore"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/trakt/movies/ignore'
                      }
                      title="Ignore"
                    ></Button>
                  </li>
                </>
              ) : null}
            </ul>
          </li>

          <li>
            <div className="w-full text-left px-4 py-2 rounded">
              Jikan Anime
            </div>
            <ul className="ml-6 mt-2 space-y-1">
              <li>
                <Button
                  href="/jikan/anime/trending"
                  selected={
                    getResourcePath(resource, media, service) ===
                    '/jikan/anime/trending'
                  }
                  title="Trending"
                ></Button>
              </li>
              <li>
                <Button
                  href="/jikan/anime/search"
                  selected={
                    getResourcePath(resource, media, service) ===
                    '/jikan/anime/search'
                  }
                  title="Search"
                ></Button>
              </li>
              {user ? (
                <>
                  <li>
                    <Button
                      href="/jikan/anime/recommend"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/jikan/anime/recommend'
                      }
                      title="Recommend"
                    ></Button>
                  </li>
                  <li>
                    <Button
                      href="/jikan/anime/favorite"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/jikan/anime/favorite'
                      }
                      title="Favorite"
                    ></Button>
                  </li>
                  <li>
                    <Button
                      href="/jikan/anime/ignore"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/jikan/anime/ignore'
                      }
                      title="Ignore"
                    ></Button>
                  </li>
                </>
              ) : null}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
