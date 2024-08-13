import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useRecommendSources } from '@/hooks/useRecommendSources'

export const AddIgnoreButton = ({
  keywords,
  itemId,
}: {
  keywords: string[]
  itemId: string | number
}) => {
  const { addToIgnore, createIgnoreMutation } = useRecommendSources()
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  return (
    <Button
      onClick={() =>
        addToIgnore({
          keywords,
          itemId,
        })
      }
      disabled={createIgnoreMutation.isPending}
      size={isDesktop ? 'default' : 'sm'}
      variant={'outline'}
    >
      Add to Ignore{' '}
      {createIgnoreMutation.isPending ? (
        <Loader2 className="ml-2 h-6 w-6 animate-spin" />
      ) : null}
    </Button>
  )
}
