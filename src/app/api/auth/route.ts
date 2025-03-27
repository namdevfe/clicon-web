import { cookies } from 'next/headers'

export const POST = async (request: Request) => {
  const token = await request.json()

  if (!token) {
    return Response.json(
      {
        message: 'Token is required'
      },
      {
        status: 400
      }
    )
  }

  cookies().set({
    name: 'auth',
    value: JSON.stringify(token),
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true
  })

  return Response.json({ message: 'Set token on cookies is successfully', data: token }, { status: 200 })
}
