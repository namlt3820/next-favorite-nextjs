import qs from 'qs'

import { IJikanAnime } from '@/types/JikanAnime'

export const getJikanTrendingAnime = async ({
  page,
  limit,
}: {
  page?: number
  limit?: number
}): Promise<IJikanAnime> => {
  const stringifiedQuery = qs.stringify(
    {
      page,
      limit,
    },
    { addQueryPrefix: true }
  )

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/jikan/anime/trend${stringifiedQuery}`,
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

    throw new Error(
      'An error occurred while creating getting Jikan trending anime.'
    )
  } catch (e) {
    throw new Error(
      'An error occurred while creating getting Jikan trending anime.'
    )
  }
}
