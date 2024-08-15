import qs from 'qs'

import { IJikanAnime } from '@/types/JikanAnime'

export const getJikanAnime = async ({
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
}): Promise<IJikanAnime> => {
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
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/jikan/anime/search${stringifiedQuery}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (res.ok) {
      return await res.json()
    }

    throw new Error('An error occurred while getting Jikan anime.')
  } catch (e) {
    throw new Error('An error occurred while getting Jikan anime.')
  }
}
