import { IRecommendSource } from '@/types/RecommendSource'

export const getRecommendSources = async (): Promise<IRecommendSource[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/recommend-source`,
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
      'An error occurred while creating getting recommend sources.'
    )
  } catch (e) {
    throw new Error(
      'An error occurred while creating getting recommend sources.'
    )
  }
}
