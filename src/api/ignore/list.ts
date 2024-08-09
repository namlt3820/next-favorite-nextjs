import { IIgnore } from '@/types/Ignore'
import { ILastEvaluatedKey } from '@/types/LastEvaluatedKey'

export type GetIgnoresParams = {
  recommendSourceId: string
  lastKey?: ILastEvaluatedKey
}

export type GetIgnoresResponse = {
  items: IIgnore[]
  lastEvaluatedKey?: ILastEvaluatedKey
}

export const getIgnores = async (
  params: GetIgnoresParams
): Promise<GetIgnoresResponse> => {
  try {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      throw new Error('Missing access token')
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/ignore/list`,
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

    throw new Error('An error occurred while getting user ignored items.')
  } catch (e) {
    throw new Error('An error occurred while getting user ignored items.')
  }
}
