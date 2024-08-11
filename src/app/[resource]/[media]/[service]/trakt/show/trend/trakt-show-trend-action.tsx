import { AddFavoriteButton } from '@/components/add-favorite'
import { AddIgnoreButton } from '@/components/add-ignore'
import { CardFooter } from '@/components/ui/card'
import { ITraktShow } from '@/types/TraktShow'

export const TraktShowTrendAction = ({ show }: { show: ITraktShow }) => {
  const {
    show: {
      ids: { trakt },
    },
  } = show

  if (trakt === 0) return null

  return (
    <CardFooter className="flex justify-between mt-auto">
      <AddIgnoreButton keywords={['trakt', 'show']} itemId={trakt} />
      <AddFavoriteButton keywords={['trakt', 'show']} itemId={trakt} />
    </CardFooter>
  )
}
