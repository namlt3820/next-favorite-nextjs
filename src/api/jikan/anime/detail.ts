import { Anime } from '@/types/JikanAnime'

export type GetJikanAnimeDetailParams = {
  itemIds: number[]
}

export type GetJikanAnimeDetailResponse = {
  itemId: number
  data: Anime
}

export const getJikanAnimeDetail = async (
  params: GetJikanAnimeDetailParams
): Promise<GetJikanAnimeDetailResponse[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/jikan/anime/detail`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }
    )

    if (res.ok) {
      const data = await res.json()
      return data
    }

    throw new Error('An error occurred while getting Jikan anime detail.')
  } catch (e) {
    throw new Error('An error occurred while getting Jikan anime detail.')
  }
}
