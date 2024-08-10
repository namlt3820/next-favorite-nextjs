import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useRecommendSources } from '@/hooks/useRecommendSources'

export const RemoveIgnoreButton = ({ id }: { id: string }) => {
  const { removeFromIgnore, deleteIgnoreMutation } = useRecommendSources()

  return (
    <Button
      onClick={() =>
        removeFromIgnore({
          id,
        })
      }
      disabled={deleteIgnoreMutation.isPending}
    >
      Remove from Ignore{' '}
      {deleteIgnoreMutation.isPending ? (
        <Loader2 className="ml-2 h-6 w-6 animate-spin" />
      ) : null}
    </Button>
  )
}
