import { JikanAnimeTrendAction } from '@/app/[resource]/[media]/[service]/jikan/anime/trend/jikan-anime-trend-action'
import { JikanAnimeTrendPagination } from '@/app/[resource]/[media]/[service]/jikan/anime/trend/jikan-anime-trend-pagination'
import { JikanAnime } from '@/components/jikan/jikan-anime'
import { LoadingResource } from '@/components/loading-resource'
import { useJikanAnimeTrend } from '@/hooks/useJikanAnimeTrend'

export const JikanAnimeTrend = () => {
  const { data, isLoading, isError } = useJikanAnimeTrend()

  if (isLoading)
    return (
      <LoadingResource message="Loading trending anime from Jikan API. Please wait." />
    )

  if (isError)
    return (
      <div>
        An error occurred while loading trending anime from Jikan API. Please
        try again later or provide feedback.
      </div>
    )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        {data?.data.map((anime) => (
          <JikanAnime
            key={anime.mal_id}
            anime={anime}
            actionComponent={<JikanAnimeTrendAction anime={anime} />}
          />
        ))}
      </div>
      <JikanAnimeTrendPagination data={data} />
    </div>
  )
}
