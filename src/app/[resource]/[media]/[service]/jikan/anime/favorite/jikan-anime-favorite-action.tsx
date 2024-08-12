import { RemoveFavoriteButton } from '@/components/remove-favorite'
import { CardFooter } from '@/components/ui/card'

export const JikanAnimeFavoriteAction = ({ id }: { id: string }) => {
  return (
    <CardFooter className="flex justify-end mt-auto">
      <RemoveFavoriteButton id={id} />
    </CardFooter>
  )
}
