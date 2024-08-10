import { RemoveIgnoreButton } from '@/components/remove-ignore'
import { CardFooter } from '@/components/ui/card'
import { ITraktMovie } from '@/types/TraktMovie'

export const TraktMovieIgnoreAction = ({
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
      <RemoveIgnoreButton id={id} />
    </CardFooter>
  )
}
