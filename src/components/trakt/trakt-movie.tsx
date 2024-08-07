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
import { ITraktMovie } from '@/types/TraktMovie'

export const TraktMovie = ({ movie }: { movie: ITraktMovie }) => {
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
  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle className="text-center">
          {title} ({year}) ({certification})
        </CardTitle>
        <CardDescription className="text-center">{tagline}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 items-center">
        <Image src={poster} height={500} width={150} alt={title} />
        <div className="text-sm">{overview}</div>
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
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant={'outline'}>Add to Ignore</Button>
        <Button>Add to Favorite</Button>
      </CardFooter>
    </Card>
  )
}
