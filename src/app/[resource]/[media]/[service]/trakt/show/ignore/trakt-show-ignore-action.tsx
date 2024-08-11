import { RemoveIgnoreButton } from '@/components/remove-ignore'
import { CardFooter } from '@/components/ui/card'
import { ITraktShow } from '@/types/TraktShow'

export const TraktShowIgnoreAction = ({
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
      <RemoveIgnoreButton id={id} />
    </CardFooter>
  )
}
