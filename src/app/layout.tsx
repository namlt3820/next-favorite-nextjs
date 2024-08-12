import { Viewport } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'

import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Toaster } from '@/components/ui/toaster'
import { constructMetadata } from '@/lib/metadata'
import { Providers } from '@/providers'

import './globals.css'

// import { Arimo, IBM_Plex_Sans, Roboto } from 'next/font/google'

export async function generateViewport(): Promise<Viewport> {
  const userAgent = headers().get('user-agent')
  const isiPhone = /iphone/i.test(userAgent ?? '')
  return isiPhone
    ? {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1, // disables auto-zoom on ios safari
      }
    : {}
}

/**
 * Used to have multiple fonts, but now using one font to make multiple languages look good
 */

// const arimo = Arimo({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-arimo',
// })
// const ibm_plex_sans = IBM_Plex_Sans({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-ibm_plex_sans',
//   weight: ['100', '200', '300', '400', '500', '600', '700'],
// })

const inter = Inter({ subsets: ['latin'] })

export const metadata = constructMetadata()

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className={inter.className}>
        <Providers>
          <div className="mx-auto flex min-h-[100dvh] container flex-col px-4">
            <Navbar />
            <main className="flex-1">{children}</main>
            <ScrollToTop />
          </div>
          <Footer />
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
