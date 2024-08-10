import { RemoveFavoriteButton } from '@/components/remove-favorite'
import { CardFooter } from '@/components/ui/card'
import { ITraktMovie } from '@/types/TraktMovie'

export const TraktMovieFavoriteAction = ({
  movie,
  id,
}: {
  movie: ITraktMovie
  id: string
}) => {
  const {
    movie: {
      ids: { trakt },
    },
  } = movie

  if (trakt === 0) return null

  return (
    <CardFooter className="flex justify-end mt-auto">
      <RemoveFavoriteButton id={id} />
    </CardFooter>
  )
}
