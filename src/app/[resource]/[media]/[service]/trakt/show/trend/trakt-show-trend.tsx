import { Loader2 } from 'lucide-react'

import { TraktShowTrendAction } from '@/app/[resource]/[media]/[service]/trakt/show/trend/trakt-show-trend-action'
import { TraktShowTrendPagination } from '@/app/[resource]/[media]/[service]/trakt/show/trend/trakt-show-trend-pagination'
import { TraktShow } from '@/components/trakt/trakt-show'
import { useTraktShowTrend } from '@/hooks/useTraktShowTrend'

export const TraktShowTrend = () => {
  const { data, isLoading, isError } = useTraktShowTrend()

  if (isLoading)
    return (
      <div className="flex items-center gap-3">
        Loading trending shows from Trakt API. Please wait.{' '}
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )

  if (isError)
    return (
      <div>
        An error occurred while loading trending shows from Trakt API. Please
        try again later or provide feedback.
      </div>
    )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        {data?.docs.map((show) => (
          <TraktShow
            key={show.show.ids.trakt}
            show={show}
            actionComponent={<TraktShowTrendAction show={show} />}
          />
        ))}
      </div>
      <TraktShowTrendPagination data={data} />
    </div>
  )
}
