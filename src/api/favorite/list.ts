import { IFavorite } from '@/types/Favorite'
import { ILastEvaluatedKey } from '@/types/LastEvaluatedKey'

export type GetFavoritesParams = {
  recommendSourceId: string
  lastKey?: ILastEvaluatedKey
  limit?: number
}

export type GetFavoritesResponse = {
  items: IFavorite[]
  lastEvaluatedKey?: ILastEvaluatedKey
}

export const getFavorites = async (
  params: GetFavoritesParams
): Promise<GetFavoritesResponse> => {
  try {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      throw new Error('Missing access token')
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/favorite/list`,
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

    throw new Error('An error occurred while getting user favorites.')
  } catch (e) {
    throw new Error('An error occurred while getting user favorites.')
  }
}
