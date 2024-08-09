import { AddFavoriteButton } from '@/components/add-favorite'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { ITraktMovie } from '@/types/TraktMovie'

export const TraktMovieTrendAction = ({ movie }: { movie: ITraktMovie }) => {
  const {
    movie: {
      ids: { trakt },
    },
  } = movie

  if (trakt === 0) return null

  return (
    <CardFooter className="flex justify-between mt-auto">
      <Button variant={'outline'}>Add to Ignore</Button>
      <AddFavoriteButton keywords={['trakt', 'movie']} itemId={trakt} />
    </CardFooter>
  )
}
