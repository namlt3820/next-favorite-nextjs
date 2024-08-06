export type LoginParams = {
  username: string
  password: string
}

export const login = async (params: LoginParams) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/auth/login`,
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
      localStorage.setItem('accessToken', data.AccessToken)
      return true
    }

    throw new Error('An error occurred while logging in the user.')
  } catch (e) {
    throw new Error('An error occurred while logging in the user.')
  }
}
