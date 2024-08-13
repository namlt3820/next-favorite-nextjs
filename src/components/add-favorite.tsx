import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useRecommendSources } from '@/hooks/useRecommendSources'

export const AddFavoriteButton = ({
  keywords,
  itemId,
}: {
  keywords: string[]
  itemId: string | number
}) => {
  const { addToFavorite, createFavoriteMutation } = useRecommendSources()
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  return (
    <Button
      onClick={() =>
        addToFavorite({
          keywords,
          itemId,
        })
      }
      disabled={createFavoriteMutation.isPending}
      size={isDesktop ? 'default' : 'sm'}
    >
      Add to Favorite{' '}
      {createFavoriteMutation.isPending ? (
        <Loader2 className="ml-2 h-6 w-6 animate-spin" />
      ) : null}
    </Button>
  )
}
