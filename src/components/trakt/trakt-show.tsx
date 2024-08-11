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
import { ITraktShow } from '@/types/TraktShow'

export const TraktShow = ({
  show,
  actionComponent,
}: {
  show: ITraktShow
  actionComponent: JSX.Element | null
}) => {
  const {
    show: {
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
  } = show

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
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-4 items-start">
          <div className="relative w-[150px] shrink-0">
            <Image
              alt="Message Image"
              src={poster ? poster : '/poster-not-found.png'}
              width={150}
              height={500}
            />
          </div>
          <div className="text-sm flex flex-col gap-4">
            {overview ? overview : '<No overview>'}

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
      {actionComponent}
    </Card>
  )
}
