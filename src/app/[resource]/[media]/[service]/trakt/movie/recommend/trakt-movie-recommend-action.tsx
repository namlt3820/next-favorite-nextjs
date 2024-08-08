import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { ITraktMovie } from '@/types/TraktMovie'

export const TraktMovieRecommendAction = ({
  movie,
}: {
  movie: ITraktMovie
}) => {
  const { addToFavorite, createFavoriteMutation } = useRecommendSources()

  const {
    movie: {
      ids: { trakt },
    },
  } = movie

  if (trakt === 0) return null

  return (
    <CardFooter className="flex justify-between mt-auto">
      <Button variant={'outline'}>Add to Ignore</Button>
      <Button
        disabled={createFavoriteMutation.isPending}
        onClick={() =>
          addToFavorite({
            keywords: ['trakt', 'movie'],
            itemId: trakt.toString(),
          })
        }
        className="flex gap-2 items-center"
      >
        Add to Favorite{' '}
        {createFavoriteMutation.isPending ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : null}
      </Button>
    </CardFooter>
  )
}
