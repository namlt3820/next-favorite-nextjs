import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useRecommendSources } from '@/hooks/useRecommendSources'

export const AddIgnoreButton = ({
  keywords,
  itemId,
}: {
  keywords: string[]
  itemId: string | number
}) => {
  const { addToIgnore, createIgnoreMutation } = useRecommendSources()

  return (
    <Button
      onClick={() =>
        addToIgnore({
          keywords,
          itemId: itemId,
        })
      }
      disabled={createIgnoreMutation.isPending}
      variant={'outline'}
    >
      Add to Ignore{' '}
      {createIgnoreMutation.isPending ? (
        <Loader2 className="ml-2 h-6 w-6 animate-spin" />
      ) : null}
    </Button>
  )
}
