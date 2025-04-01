import { cookies } from 'next/headers'

export const POST = async (request: Request) => {
  const user = await request.json()

  if (!user) {
    return Response.json(
      {
        message: 'User data is required'
      },
      {
        status: 400
      }
    )
  }

  cookies().set({
    name: 'profile',
    value: JSON.stringify(user),
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true
  })

  return Response.json({ message: 'Set profile on cookies is successfully' }, { status: 200 })
}
