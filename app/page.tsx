'use client'

import React, { useEffect, useState } from 'react'

import { ReactTerminal, TerminalContextProvider } from 'react-terminal'

import useMediaQuery from '@custom-react-hooks/use-media-query'

import CommandHandler from './components/CommandHandler'
import EmailLink from './components/EmailLink'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setIsLoading(false)
  }, [])

  const isMobile = useMediaQuery('(max-width: 768px)')

  const welcomeMessage = showWelcomeMessage && (
    <section className="container mx-auto px-4">
      <header>
        <h1 className="text-md font-bold">Krum Georgiev</h1>
        {isMobile ? (
          <ul className="list-disc pl-5">
            <li className="text-md">Tech enthusiast</li>
            <li className="text-md">Staff Engineer at Vercel</li>
            <li className="text-md">TC39 member</li>
            <li className="text-md">Stuck in Vim</li>
          </ul>
        ) : (
          <div className="text-md">
            Tech enthusiast | Staff Engineer at Vercel | TC39 member | Stuck in
            Vim
            <hr className="my-2 border-t-2 border-gray-300" />
          </div>
        )}
      </header>
      <section>
        <h2 className="text-md font-semibold">Previously:</h2>
        <ul className="list-disc pl-5">
          <li>
            Senior Software Engineer at Patient21{' '}
            <span className="text-blue-200">[Jan 2021 - May 2024]</span>
          </li>
          <li>
            Principal Engineer at Facebook{' '}
            <span className="text-blue-200">[Jan 2020 - Jan 2021]</span>
          </li>
          <li>
            Senior Front End Engineer at Bosch{' '}
            <span className="text-blue-200">[Apr 2018 - Jan 2020]</span>
          </li>
          <li>
            Development Lead at Adobe{' '}
            <span className="text-blue-200">[Sep 2016 - Mar 2018]</span>
          </li>
          <li>
            Senior Software Engineer at Ontotext{' '}
            <span className="text-blue-200">[Aug 2007 - Sep 2016]</span>
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-md font-semibold">Connect with me:</h2>
        <ul className="list-none flex items-center space-x-4">
          <li>
            <a
              href="https://linkedin.com/in/krumgeorgiev"
              className="text-blue-500 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li className="delimiter">|</li>
          <li>
            <a
              href="/Profile.pdf"
              className="text-blue-500 hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              CV
            </a>
          </li>
          <li className="delimiter">|</li>
          <li>
            <EmailLink user="contact" domain="krumgeorgiev" tld="com">
              Email
            </EmailLink>
          </li>
        </ul>
      </section>

      {!isMobile && (
        <footer>
          <h2 className="text-md font-semibold">
            Type &quot;help&quot; or &quot;?&quot; to discover all available
            commands. Want to know more about me? Try &quot;about.&quot; Curious
            about my experience? Type &quot;exp.&quot;
          </h2>
        </footer>
      )}
    </section>
  )

  if (!isClient) {
    return null
  }

  return (
    <>
      {!isMobile ? (
        <TerminalContextProvider>
          {!isLoading && (
            <ReactTerminal
              theme="material-ocean"
              enableInput
              prompt="Krum:~/dev$"
              welcomeMessage={welcomeMessage}
              defaultHandler={(command: string, commandArguments: string) => (
                <CommandHandler
                  command={command}
                  commandArguments={commandArguments}
                  setShowWelcomeMessage={setShowWelcomeMessage}
                />
              )}
              errorMessage={(command: string) =>
                `zsh: command not found: ${command}`
              }
            />
          )}
        </TerminalContextProvider>
      ) : (
        welcomeMessage
      )}
    </>
  )
}
