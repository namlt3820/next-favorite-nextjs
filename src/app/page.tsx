'use client'

import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

import { ResourceMenu } from '@/components/resource-menu'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useJikanAnimeTrend } from '@/hooks/useJikanAnimeTrend'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useTraktMovieTrend } from '@/hooks/useTraktMovieTrend'

const Introduction = () => (
  <div>
    <h1 className="text-2xl mb-4 text-center">
      Welcome to <span className="font-bold">NextFavorite</span>!
    </h1>
    <div className="flex flex-col gap-4">
      <p>
        This is a small website designed to help you expand your list of
        favorite entertainment media. Currently, we utilize public APIs such as
        Trakt for <span className="font-bold">movies</span> and{' '}
        <span className="font-bold">TV shows</span>, and Jikan for{' '}
        <span className="font-bold">anime</span>.
      </p>
      <p>
        <span className="font-bold">Trakt</span> is a popular platform that
        records and recommends movies and TV shows, with its API providing a
        wealth of information about films and television series, including
        trailers, overviews, genres, and posters.
      </p>
      <p>
        <span className="font-bold">Jikan</span>, an unofficial MyAnimeList API,
        offers access to a comprehensive database of anime and manga, allowing
        you to retrieve details on various titles, including summaries, ratings,
        genres, and posters.
      </p>

      <p>
        Feel free to suggest any public media APIs you would like us to
        integrate into our system. As long as it includes a{' '}
        <span className="font-bold">search</span> component and a{' '}
        <span className="font-bold">recommendation</span> component, we would be
        happy to work on it!
      </p>
    </div>
  </div>
)

const Usage = () => (
  <div>
    <h1 className="text-2xl mb-4 text-center font-bold">Usage</h1>
    <div className="flex flex-col gap-4">
      <p>
        To use our website, refer to the left navigation menu. Currently, we
        offer three sources of media:{' '}
        <span className="font-bold">Trakt movies</span>,{' '}
        <span className="font-bold">Trakt TV shows</span>, and{' '}
        <span className="font-bold">Jikan anime</span>. Within each media
        source, you&apos;ll find several sections: trending, search, recommend,
        favorite, and ignore. Here&apos;s how you can use these sections:
      </p>
      <div className="flex flex-col gap-2">
        <p>1. Register an account using the top navigation bar.</p>{' '}
        <p>
          2. Browse the <span className="font-bold">trending</span> section or
          search for a title in the <span className="font-bold">search</span>{' '}
          section. From the search results, you can add items to your{' '}
          <span className="font-bold">favorite</span> list (which will be used
          for recommendations) or to your{' '}
          <span className="font-bold">ignore</span> list (which will exclude
          them from future recommendations).
        </p>
        <p>
          3. Once you have populated your favorite list, you can browse the{' '}
          <span className="font-bold">recommend</span> section to discover more
          items that might interest you.
        </p>
        <p>
          4. Continuously expand your favorite list to receive more personalized
          recommendations.
        </p>
      </div>
      <p>That&apos;s it. Have fun!</p>
    </div>
  </div>
)

const PosterCarousel = ({ posters }: { posters: string[] }) => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[Autoplay({ delay: 10000 }) as any]}
      className="w-full max-w-screen-md mx-auto"
    >
      <CarouselContent>
        {posters.map((poster, index) => (
          <CarouselItem
            key={`${poster}_${index}`}
            className="basis-1/2 lg:basis-1/5 "
          >
            <Card>
              <CardContent className=" p-0 h-[200px] relative">
                <Image
                  alt="Message Image"
                  src={poster ? poster : '/poster-not-found.png'}
                  className="rounded-md"
                  fill={true}
                  sizes="auto"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

const Movies = () => {
  const { data, isLoading, isError } = useTraktMovieTrend()
  if (isError || isLoading) return null

  const posters = data?.docs.map((item) => item.movie.poster) || []
  return <PosterCarousel posters={posters} />
}

const Anime = () => {
  const { data, isLoading, isError } = useJikanAnimeTrend()
  if (isError || isLoading) return null

  const posters = data?.data.map((item) => item.images?.jpg?.image_url) || []
  return <PosterCarousel posters={posters} />
}

export default function Home() {
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  return (
    <div className="flex mt-[60px] min-h-[100dvh]">
      {/* Sidebar Column */}
      {isDesktop ? <ResourceMenu /> : null}

      {/* Content Column */}
      <div className="flex-1 p-6 flex flex-col gap-12 mb-14 md:mb-20">
        <Introduction />
        <Movies />
        <Usage />
        <Anime />
      </div>
    </div>
  )
}
