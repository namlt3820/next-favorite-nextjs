export type VerifyEmailParams = {
  username: string
  confirmationCode: string
}

export const verifyEmail = async (params: VerifyEmailParams) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEXT_FAVORITE_BACKEND}/auth/verify`,
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

    throw new Error('An error occurred while verifying the email.')
  } catch (e) {
    throw new Error('An error occurred while verifying the email.')
  }
}
