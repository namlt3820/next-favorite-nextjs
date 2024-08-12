import { RemoveIgnoreButton } from '@/components/remove-ignore'
import { CardFooter } from '@/components/ui/card'

export const JikanAnimeIgnoreAction = ({ id }: { id: string }) => {
  return (
    <CardFooter className="flex justify-end mt-auto">
      <RemoveIgnoreButton id={id} />
    </CardFooter>
  )
}
