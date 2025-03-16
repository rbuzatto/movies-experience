import Providers from '@/providers/QueryClient'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Movies Experience',
  description: 'Find your favorite movie',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/token`, { cache: 'no-store' })

  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
