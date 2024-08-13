import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useRecommendSources } from '@/hooks/useRecommendSources'

export const RemoveIgnoreButton = ({ id }: { id: string }) => {
  const { removeFromIgnore, deleteIgnoreMutation } = useRecommendSources()
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  return (
    <Button
      onClick={() =>
        removeFromIgnore({
          id,
        })
      }
      disabled={deleteIgnoreMutation.isPending}
      size={isDesktop ? 'default' : 'sm'}
    >
      Remove from Ignore{' '}
      {deleteIgnoreMutation.isPending ? (
        <Loader2 className="ml-2 h-6 w-6 animate-spin" />
      ) : null}
    </Button>
  )
}
