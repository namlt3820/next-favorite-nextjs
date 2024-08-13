import { Loader2 } from 'lucide-react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

export const LoadingResource = ({ message }: { message: string }) => {
  const isDesktop = useMediaQuery('(min-width: 1280px)')

  return (
    <div className={cn('flex items-center gap-3', { 'flex-col': !isDesktop })}>
      {message}
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  )
}
