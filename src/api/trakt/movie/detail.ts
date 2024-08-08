import { Movie } from '@/types/TraktMovie'

export type GetTraktMovieDetailParams = {
  itemIds: number[]
}

export type GetTraktMovieDetailResponse = {
  itemId: number
  data: Movie
}

export const getTraktMovieDetail = async (
  params: GetTraktMovieDetailParams
): Promise<GetTraktMovieDetailResponse[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/trakt/movie/detail`,
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

    throw new Error('An error occurred while getting trakt movie detail.')
  } catch (e) {
    throw new Error('An error occurred while getting trakt movie detail.')
  }
}
