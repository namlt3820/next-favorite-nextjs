import qs from 'qs'

import { IPagination } from '@/types/Pagination'
import { ITraktMovie } from '@/types/TraktMovie'

export const getTraktMovies = async ({
  page,
  limit,
  query,
  recommendSourceId,
  userId,
}: {
  page?: number
  limit?: number
  query?: string
  recommendSourceId?: string
  userId?: string
}): Promise<IPagination<ITraktMovie>> => {
  const stringifiedQuery = qs.stringify(
    {
      page,
      limit,
      query,
      recommendSourceId,
      userId,
    },
    { addQueryPrefix: true }
  )

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/trakt/movie/search${stringifiedQuery}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (res.ok) {
      return {
        docs: await res.json(),
        page: Number(res.headers.get('X-Pagination-Page')),
        pageCount: Number(res.headers.get('X-Pagination-Page-Count')),
        limit: Number(res.headers.get('X-Pagination-Limit')),
        itemCount: Number(res.headers.get('X-Pagination-Item-Count')),
      }
    }

    throw new Error('An error occurred while getting Trakt movies.')
  } catch (e) {
    throw new Error('An error occurred while getting Trakt movies.')
  }
}
