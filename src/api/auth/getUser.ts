import { User } from '@/types/User'

export const getUser = async (): Promise<User | null> => {
  try {
    const accessToken = localStorage.getItem('accessToken')

    if (!accessToken) {
      return null
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/auth/profile`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
        }),
      }
    )

    if (res.ok) {
      const data = await res.json()
      return data
    }

    localStorage.removeItem('accessToken')
    throw new Error('An error occurred while getting user data.')
  } catch (e) {
    localStorage.removeItem('accessToken')
    throw new Error('An error occurred while getting user data.')
  }
}
