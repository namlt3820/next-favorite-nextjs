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
    <Card className="w-[500px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
        {rating ? (
          <CardDescription className="text-center">{rating}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
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
        <div className="flex gap-4 items-start">
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
              {trailer ? (
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
