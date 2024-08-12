import { RecommendAnime } from '@/types/JikanAnime'

export const getJikanAnimeRecommend = async (params: {
  recommendSourceId: string
}): Promise<RecommendAnime[]> => {
  try {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      throw new Error('Missing access token.')
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/jikan/anime/recommend`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(params),
      }
    )

    if (res.ok) {
      const data = await res.json()
      return data
    }

    throw new Error('An error occurred while getting Jikan recommended anime.')
  } catch (e) {
    throw new Error('An error occurred while getting Jikan recommended anime.')
  }
}
