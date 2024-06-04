import './global.css'

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
      <body className="antialiased">
        <main className="font-chivo">{children}</main>
      </body>
    </html>
  )
}
