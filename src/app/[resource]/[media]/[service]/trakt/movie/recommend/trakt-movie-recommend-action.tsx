import { AddFavoriteButton } from '@/components/add-favorite'
import { AddIgnoreButton } from '@/components/add-ignore'
import { CardFooter } from '@/components/ui/card'
import { ITraktMovie } from '@/types/TraktMovie'

export const TraktMovieRecommendAction = ({
  movie,
}: {
  movie: ITraktMovie
}) => {
  const {
    movie: {
      ids: { trakt },
    },
  } = movie

  if (trakt === 0) return null

  return (
    <CardFooter className="flex justify-between mt-auto">
      <AddIgnoreButton keywords={['trakt', 'movie']} itemId={trakt} />
      <AddFavoriteButton keywords={['trakt', 'movie']} itemId={trakt} />
    </CardFooter>
  )
}
