import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getData } from './services/httpServer'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (token) return NextResponse.next()

  try {
    const resp = await getData<{ token: string }>('/auth/token')
    const newToken = resp.token
    if (!newToken) {
      return NextResponse.next()
    }

    const response = NextResponse.next()
    response.cookies.set({
      name: 'token',
      value: newToken,
      httpOnly: false,
      maxAge: 60 * 60 * 24,
    })

    return NextResponse.rewrite(request.nextUrl, response)
  } catch (error) {
    return NextResponse.next()
  }
}
