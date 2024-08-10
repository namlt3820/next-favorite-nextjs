export type DeleteIgnoreParams = {
  id: string
}

export const deleteIgnore = async ({
  id,
}: DeleteIgnoreParams): Promise<boolean> => {
  try {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      throw new Error(
        'You need to log in or register before removing items from your ignored list .'
      )
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/ignore`,
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

    throw new Error('An error occurred while removing items from ignored list.')
  } catch (e: any) {
    if (e.message) {
      throw e
    }
    throw new Error('An error occurred while removing items from ignored list.')
  }
}
