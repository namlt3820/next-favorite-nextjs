import qs from 'qs'

import { Pagination } from '@/types/Pagination'
import { ITraktMovie } from '@/types/TraktMovie'

export const getTraktTrendingMovies = async ({
  page,
  limit,
}: {
  page?: number
  limit?: number
}): Promise<Pagination<ITraktMovie>> => {
  const stringifiedQuery = qs.stringify(
    {
      page,
      limit,
    },
    { addQueryPrefix: true }
  )

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/trakt/movie/trend${stringifiedQuery}`,
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
        page: Number(res.headers.get('x-pagination-page')),
        pageCount: Number(res.headers.get('x-pagination-page-count')),
        limit: Number(res.headers.get('x-pagination-limit')),
        itemCount: Number(res.headers.get('x-pagination-item-count')),
      }
    }

    throw new Error(
      'An error occurred while creating getting Trakt trending movies.'
    )
  } catch (e) {
    throw new Error(
      'An error occurred while creating getting Trakt trending movies.'
    )
  }
}
