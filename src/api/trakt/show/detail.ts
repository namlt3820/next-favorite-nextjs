import { Show } from '@/types/TraktShow'

export type GetTraktShowDetailParams = {
  itemIds: number[]
}

export type GetTraktShowDetailResponse = {
  itemId: number
  data: Show
}

export const getTraktShowDetail = async (
  params: GetTraktShowDetailParams
): Promise<GetTraktShowDetailResponse[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/trakt/show/detail`,
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

    throw new Error('An error occurred while getting trakt show detail.')
  } catch (e) {
    throw new Error('An error occurred while getting trakt show detail.')
  }
}
