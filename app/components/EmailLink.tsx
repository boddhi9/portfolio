import { useState, useEffect, PropsWithChildren } from 'react'

import Link from 'next/link'

type Link = {
  user: string
  domain: string
  tld: string
}

const EmailLink = ({
  user,
  domain,
  tld,
  children,
}: PropsWithChildren<Link>) => {
  const [email, setEmail] = useState('')

  useEffect(() => {
    const fullEmail = `${user}@${domain}.${tld}`
    setEmail(fullEmail)
  }, [user, domain, tld])

  return (
    <Link
      href={`mailto:${email}`}
      className="text-blue-500 hover:text-blue-300"
    >
      {children || email}
    </Link>
  )
}

export default EmailLink
