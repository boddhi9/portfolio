import { Metadata } from 'next'
import './global.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://krumgeorgiev.com'),
  title: {
    default: 'Krum Georgiev',
    template: '%s | Krum Georgiev',
  },
  description: 'Developer.',
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

const cx = (...classes) => classes.filter(Boolean).join(' ')

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
      <body className="antialiased">
        <main className="font-chivo">{children}</main>
      </body>
    </html>
  )
}
