import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { useRecommendSources } from '@/hooks/useRecommendSources'
import { ITraktMovie } from '@/types/TraktMovie'

export const TraktMovieTrendAction = ({ movie }: { movie: ITraktMovie }) => {
  const { addToFavorite } = useRecommendSources()

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
  )
}
