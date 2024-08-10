import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useRecommendSources } from '@/hooks/useRecommendSources'

export const RemoveFavoriteButton = ({ id }: { id: string }) => {
  const { removeFromFavorite, deleteFavoriteMutation } = useRecommendSources()

  return (
    <Button
      onClick={() =>
        removeFromFavorite({
          id,
        })
      }
      disabled={deleteFavoriteMutation.isPending}
    >
      Remove from Favorite{' '}
      {deleteFavoriteMutation.isPending ? (
        <Loader2 className="ml-2 h-6 w-6 animate-spin" />
      ) : null}
    </Button>
  )
}
