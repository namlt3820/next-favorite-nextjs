import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useRecommendSources } from '@/hooks/useRecommendSources'

export const RemoveFavoriteButton = ({ id }: { id: string }) => {
  const { removeFromFavorite, deleteFavoriteMutation } = useRecommendSources()
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  return (
    <Button
      onClick={() =>
        removeFromFavorite({
          id,
        })
      }
      disabled={deleteFavoriteMutation.isPending}
      size={isDesktop ? 'default' : 'sm'}
    >
      Remove from Favorite{' '}
      {deleteFavoriteMutation.isPending ? (
        <Loader2 className="ml-2 h-6 w-6 animate-spin" />
      ) : null}
    </Button>
  )
}
