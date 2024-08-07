export type CreateFavoriteParams = {
  itemId: string
  recommendSourceId: string
}

export const createFavorite = async ({
  itemId,
  recommendSourceId,
}: CreateFavoriteParams): Promise<boolean> => {
  try {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      throw new Error('Missing access token.')
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/favorite`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ itemId, recommendSourceId }),
      }
    )

    if (res.ok) {
      return true
    }

    throw new Error('An error occurred while creating creating favorite.')
  } catch (e) {
    throw new Error('An error occurred while creating creating favorite.')
  }
}
