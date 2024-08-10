export type DeleteFavoriteParams = {
  id: string
}

export const deleteFavorite = async ({
  id,
}: DeleteFavoriteParams): Promise<boolean> => {
  try {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      throw new Error(
        'You need to log in or register before removing from your favorite list .'
      )
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/favorite`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ id }),
      }
    )

    if (res.ok) {
      return true
    }

    throw new Error('An error occurred while removing from favorite list.')
  } catch (e: any) {
    if (e.message) {
      throw e
    }
    throw new Error('An error occurred while removing from favorite list.')
  }
}
