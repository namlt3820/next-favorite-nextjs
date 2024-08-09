import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { ITraktMovie } from '@/types/TraktMovie'

export const TraktMovieIgnoreAction = ({ movie }: { movie: ITraktMovie }) => {
  const { addToFavorite } = useRecommendSources()

  const {
    movie: {
      ids: { trakt },
    },
  } = movie

  if (trakt === 0) return null

  return (
    <CardFooter className="flex justify-end mt-auto">
      <Button
        onClick={() =>
          //   addToFavorite({
          //     keywords: ['trakt', 'movie'],
          //     itemId: trakt.toString(),
          //   })
          console.log('ok')
        }
      >
        Remove from Favorite
      </Button>
    </CardFooter>
  )
}
