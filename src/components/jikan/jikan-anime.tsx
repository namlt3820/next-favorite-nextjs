import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'
import { Anime, Images } from '@/types/JikanAnime'

const getImage = (images: Images) => {
  if (!images) return '/poster-not-found.png'
  if (images.jpg) return images.jpg.image_url
  if (images.webp) return images.webp.image_url

  return '/poster-not-found.png'
}

export const JikanAnime = ({
  anime,
  actionComponent,
}: {
  anime: Anime
  actionComponent: JSX.Element | null
}) => {
  const isDesktop = useMediaQuery('(min-width: 1280px)')
  const {
    title,
    synopsis,
    images,
    genres = [],
    mal_id,
    rating,
    trailer,
    aired,
    status,
    type,
    score,
    popularity,
    rank,
  } = anime

  return (
    <Card
      className={cn('flex flex-col', {
        'w-[500px]': isDesktop,
        'w-full': !isDesktop,
      })}
    >
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        {rating ? (
          <CardDescription className="text-center">{rating}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {isDesktop ? (
          <>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <span className="font-semibold">Type: </span>
                <span>{type}</span>
              </div>
              <div className="col-start-2">
                <span className="font-semibold">Status: </span>
                <span>{status}</span>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <span className="font-semibold">From: </span>
                <span>{aired?.from?.split('T')[0] || ''}</span>
              </div>
              <div className="col-start-2">
                <span className="font-semibold">To: </span>
                <span>{aired?.to?.split('T')[0] || ''}</span>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <span className="font-semibold">Score: </span>
                <span>{score || ''}</span>
              </div>
              <div className="col-start-2">
                <span className="font-semibold">Rank: </span>
                <span>{rank || ''}</span>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <span className="font-semibold">Popularity: </span>
                <span>{popularity || ''}</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-1">
            <div>
              <span className="font-semibold">Type: </span>
              <span>{type}</span>
            </div>
            <div>
              <span className="font-semibold">Status: </span>
              <span>{status}</span>
            </div>

            <div>
              <span className="font-semibold">From: </span>
              <span>{aired?.from?.split('T')[0] || ''}</span>
            </div>
            <div>
              <span className="font-semibold">To: </span>
              <span>{aired?.to?.split('T')[0] || ''}</span>
            </div>

            <div>
              <span className="font-semibold">Score: </span>
              <span>{score || ''}</span>
            </div>
            <div>
              <span className="font-semibold">Rank: </span>
              <span>{rank || ''}</span>
            </div>

            <div>
              <span className="font-semibold">Popularity: </span>
              <span>{popularity || ''}</span>
            </div>
          </div>
        )}
        <div
          className={cn(
            'flex gap-4',
            { 'items-start': isDesktop },
            { 'flex-col items-center': !isDesktop }
          )}
        >
          <div className="relative w-[150px] shrink-0">
            <Image
              alt="Message Image"
              src={getImage(images)}
              width={150}
              height={500}
            />
          </div>
          <div className="text-sm flex flex-col gap-4">
            {synopsis ? synopsis : '<No synopsis>'}

            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Badge key={`${mal_id}-${genre.name}`} variant={'outline'}>
                  {genre.name}
                </Badge>
              ))}
              {trailer?.url ? (
                <Badge variant={'outline'}>
                  <a
                    href={trailer.url}
                    className="flex gap-2 items-center justify-center"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    trailer <ExternalLink className="h-4 w-4" />
                  </a>
                </Badge>
              ) : null}
            </div>
          </div>
        </div>
      </CardContent>
      {actionComponent}
    </Card>
  )
}
