import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { scrollToTop } from '@/lib/scrollToTop'
import { cn } from '@/lib/utils'
import { useAuth } from '@/providers/Auth'

const ResourceMenuItem = ({
  title,
  href,
  selected,
}: {
  title: string
  href: string
  selected: boolean
}) => {
  return (
    <DropdownMenuItem
      onClick={scrollToTop}
      className={cn({
        'text-accent-foreground bg-accent': selected,
      })}
      asChild
    >
      <Link href={href}>{title}</Link>
    </DropdownMenuItem>
  )
}

const getResourcePath = (resource?: string, media?: string, service?: string) =>
  `/${resource}/${media}/${service}`

export const ResourceMenuMobile = ({
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="text-sm font-medium">Search</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Trakt Shows</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <ResourceMenuItem
                  title="Trending"
                  href="/trakt/shows/trending"
                  selected={
                    getResourcePath(resource, media, service) ===
                    '/trakt/shows/trending'
                  }
                />
                <ResourceMenuItem
                  title="Search"
                  href="/trakt/shows/search"
                  selected={
                    getResourcePath(resource, media, service) ===
                    '/trakt/shows/search'
                  }
                />
                {user ? (
                  <>
                    <ResourceMenuItem
                      title="Recommend"
                      href="/trakt/shows/recommend"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/trakt/shows/recommend'
                      }
                    />
                    <ResourceMenuItem
                      title="Favorite"
                      href="/trakt/shows/favorite"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/trakt/shows/favorite'
                      }
                    />
                    <ResourceMenuItem
                      title="Ignore"
                      href="/trakt/shows/ignore"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/trakt/shows/ignore'
                      }
                    />
                  </>
                ) : null}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Trakt Movies</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <ResourceMenuItem
                  title="Trending"
                  href="/trakt/movies/trending"
                  selected={
                    getResourcePath(resource, media, service) ===
                    '/trakt/movies/trending'
                  }
                />
                <ResourceMenuItem
                  title="Search"
                  href="/trakt/movies/search"
                  selected={
                    getResourcePath(resource, media, service) ===
                    '/trakt/movies/search'
                  }
                />
                {user ? (
                  <>
                    <ResourceMenuItem
                      title="Recommend"
                      href="/trakt/movies/recommend"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/trakt/movies/recommend'
                      }
                    />
                    <ResourceMenuItem
                      title="Favorite"
                      href="/trakt/movies/favorite"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/trakt/movies/favorite'
                      }
                    />
                    <ResourceMenuItem
                      title="Ignore"
                      href="/trakt/movies/ignore"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/trakt/movies/ignore'
                      }
                    />
                  </>
                ) : null}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>Jikan Anime</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <ResourceMenuItem
                  title="Trending"
                  href="/jikan/anime/trending"
                  selected={
                    getResourcePath(resource, media, service) ===
                    '/jikan/anime/trending'
                  }
                />
                <ResourceMenuItem
                  title="Search"
                  href="/jikan/anime/search"
                  selected={
                    getResourcePath(resource, media, service) ===
                    '/jikan/anime/search'
                  }
                />
                {user ? (
                  <>
                    <ResourceMenuItem
                      title="Recommend"
                      href="/jikan/anime/recommend"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/jikan/anime/recommend'
                      }
                    />
                    <ResourceMenuItem
                      title="Favorite"
                      href="/jikan/anime/favorite"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/jikan/anime/favorite'
                      }
                    />
                    <ResourceMenuItem
                      title="Ignore"
                      href="/jikan/anime/ignore"
                      selected={
                        getResourcePath(resource, media, service) ===
                        '/jikan/anime/ignore'
                      }
                    />
                  </>
                ) : null}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
