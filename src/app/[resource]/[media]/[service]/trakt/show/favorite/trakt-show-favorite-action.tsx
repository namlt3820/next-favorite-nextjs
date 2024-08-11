import { RemoveFavoriteButton } from '@/components/remove-favorite'
import { CardFooter } from '@/components/ui/card'
import { ITraktShow } from '@/types/TraktShow'

export const TraktShowFavoriteAction = ({
  show,
  id,
}: {
  show: ITraktShow
  id: string
}) => {
  const {
    show: {
      ids: { trakt },
    },
  } = show

  if (trakt === 0) return null

  return (
    <CardFooter className="flex justify-end mt-auto">
      <RemoveFavoriteButton id={id} />
    </CardFooter>
  )
}
