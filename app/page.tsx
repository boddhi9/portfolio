'use client'

import { useEffect, useState } from 'react'

import { ReactTerminal, TerminalContextProvider } from 'react-terminal'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const commands = {
    help: (
      <span>
        <strong>clear</strong> - clears the console <br />
        <strong>about</strong> - some info about me <br />
        <strong>exp</strong> - experience <br />
      </span>
    ),
    about: (
      <span>
        <strong>Tech enthusiast</strong>
        <br />
        <strong>Staff Engineer at Vercel</strong>
        <br />
        <strong>TC39 member</strong>
        <br />
        <strong>Skydiver</strong>
        <br />
      </span>
    ),
    exp: (
      <span>
        <strong>Tech enthusiast</strong>
        <br />
        <strong>Staff Engineer at Vercel</strong>
        <br />
        <strong>TC39 member</strong>
        <br />
        <strong>Skydiver</strong>
        <br />
      </span>
    ),
    ls: (
      <div>
        <div>bin</div>
        <div>dev</div>
        <div>nvim-macos</div>
        <div>npm</div>
      </div>
    ),
    cd: (dir) => {
      const allowedDirs = ['bin', 'dev', 'nvim-macos', 'npm']
      if (!dir || dir === '.' || dir === '..' || dir === '') {
        return ''
      }
      if (allowedDirs.includes(dir)) {
        return `zsh: cd: ${dir}: Permission denied`
      }
      return `cd: no such file or directory: ${dir}`
    },
  }
  const welcomeMessage = (
    <>
      <div className="container">
        <div className="header">
          <p>Tech enthusiast</p>
          <p>Staff Engineer at Vercel</p>
          <p>TC39 member</p>
          <p>Skydiver</p>
          <p>Stuck in Vim</p>
        </div>
        <h2>Previously:</h2>
        <ul>
          <li>Staff Engineer at Facebook</li>
          <li>Lead Engineer at Adobe</li>
          <li>Senior Front End Engineer at Bosch</li>
        </ul>
        <h2>Where I hide:</h2>
        <ul>
          <li>
            <a href="https://linkedin.com/in/krumgeorgiev">LinkedIn</a>
          </li>
          <li>
            <a href="https://www.google.com/maps/@42.6798277,23.3590247,12.59z?entry=ttu">
              Sofia
            </a>
          </li>
        </ul>
        <h2>Type &quot;help&quot; for all available commands.</h2>
      </div>
    </>
  )
  return (
    <TerminalContextProvider>
      <div className="terminal">
        {!isLoading && (
          <ReactTerminal
            theme="material-ocean"
            showControlBar={false}
            commands={commands}
            prompt="🪂 boddhi: ~"
            welcomeMessage={welcomeMessage}
            errorMessage={(command) => {
              return `zsh: command not found: ${command}`
            }}
          />
        )}
      </div>
    </TerminalContextProvider>
  )
}
