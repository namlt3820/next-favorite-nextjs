import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useRecommendSources } from '@/hooks/useRecommendSources'

export const AddFavoriteButton = ({
  keywords,
  itemId,
}: {
  keywords: string[]
  itemId: string | number
}) => {
  const { addToFavorite, createFavoriteMutation } = useRecommendSources()

  return (
    <Button
      onClick={() =>
        addToFavorite({
          keywords,
          itemId,
        })
      }
      disabled={createFavoriteMutation.isPending}
    >
      Add to Favorite{' '}
      {createFavoriteMutation.isPending ? (
        <Loader2 className="ml-2 h-6 w-6 animate-spin" />
      ) : null}
    </Button>
  )
}
