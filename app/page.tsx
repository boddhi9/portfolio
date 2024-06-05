'use client'

import { useEffect, useState } from 'react'

import { ReactTerminal, TerminalContextProvider } from 'react-terminal'

import CommandHandler from './components/CommandHandler'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const welcomeMessage = showWelcomeMessage && (
    <section className="container mx-auto">
      <header>
        <h1 className="text-md font-bold">Krum Georgiev</h1>
        <p className="text-md">
          Tech enthusiast | Staff Engineer at Vercel | TC39 member | Stuck in
          Vim
        </p>
      </header>

      <section>
        <h2 className="text-md font-semibold">Previously:</h2>
        <ul className="list-disc pl-5">
          <li>Senior Software Engineer at Patient21 (Jan 2021 - May 2024 )</li>
          <li>Principal Engineer at Facebook (Jan 2020 - Jan 2021 )</li>
          <li>Senior Front End Engineer at Bosch (Apr 2018 - Jan 2020)</li>
          <li>Development Lead at Adobe (Sep 2016 - Mar 2018)</li>
          <li>Senior Software Engineer at Ontotext (Aug 2007 - Sep 2016)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-md font-semibold">More:</h2>
        <ul className="list-disc pl-5">
          <li>
            <a
              href="https://linkedin.com/in/krumgeorgiev"
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="/Profile.pdf"
              className="text-gray-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </li>
        </ul>
      </section>

      <footer>
        <h2 className="text-md font-semibold">
          Type &quot;help&quot; or &quot;?&quot; for all available commands. Try
          &quot;about&quot; to learn more about me and &quot;exp&quot; to see my
          experience.
        </h2>
      </footer>
    </section>
  )

  return (
    <TerminalContextProvider>
      <div className="terminal">
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
      </div>
    </TerminalContextProvider>
  )
}
