import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { ITraktMovie } from '@/types/TraktMovie'

export const TraktMovie = ({ movie }: { movie: ITraktMovie }) => {
  const { addToFavorite } = useRecommendSources()

  const {
    movie: {
      title,
      tagline,
      overview,
      poster,
      year,
      genres,
      ids: { trakt },
      certification,
      trailer,
    },
  } = movie

  if (trakt === 0) return null

  return (
    <Card className="w-[500px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-center">
          {title} {year ? `(${year})` : ''}{' '}
          {certification ? `(${certification})` : ''}
        </CardTitle>
        <CardDescription className="text-center">{tagline}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-center">
        <div className="flex gap-4 items-start">
          <div className="relative w-[150px] shrink-0">
            <Image alt="Message Image" src={poster} width={150} height={500} />
          </div>
          <div className="text-sm flex flex-col gap-4">
            {overview}

            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Badge key={`${trakt}-${genre}`} variant={'outline'}>
                  {genre}
                </Badge>
              ))}
              {trailer ? (
                <Badge variant={'outline'}>
                  <a
                    href={trailer}
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
      <CardFooter className="flex justify-between mt-auto">
        <Button variant={'outline'}>Add to Ignore</Button>
        <Button
          onClick={() =>
            addToFavorite({
              keywords: ['trakt', 'movie'],
              itemId: trakt.toString(),
            })
          }
        >
          Add to Favorite
        </Button>
      </CardFooter>
    </Card>
  )
}
