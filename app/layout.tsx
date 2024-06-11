import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Metadata } from 'next'
import './global.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://krumgeorgiev.com'),
  title: {
    default: "Krum's Portfolio",
    template: '%s | Krum Georgiev',
  },
  description: 'Developer and creator of things',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Krum Georgiev',
    card: 'summary_large_image',
  },
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx('text-black bg-white dark:text-white dark:bg-[#111010]')}
    >
      <head />
      <body>
        <main className="font-chivo">
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
