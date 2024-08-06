export type CreateUserParams = {
  username: string
  email: string
  password: string
}

export const createUser = async (params: CreateUserParams) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/auth/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      }
    )

    if (res.ok) {
      const { message } = await res.json()
      return message
    }

    throw new Error('An error occurred while creating user.')
  } catch (e) {
    throw new Error('An error occurred while creating user.')
  }
}
