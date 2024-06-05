'use client'

import { useEffect, useState } from 'react'

import { ReactTerminal, TerminalContextProvider } from 'react-terminal'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [inputEnabled, setInputEnabled] = useState(true)
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)
  const canRender = !isLoading

  useEffect(() => {
    setIsLoading(false)
    setInputEnabled(true)
  }, [])

  const handleCommand = (command: string, commandArguments: string) => {
    if (showWelcomeMessage) {
      setShowWelcomeMessage(false)
    }

    switch (command) {
      case 'help':
      case '?':
        return (
          <span>
            <strong>clear</strong> - clears the console <br />
            <strong>about</strong> - info about me <br />
            <strong>experience (or just exp)</strong> - my experience <br />
            <strong>get cv</strong> - download my CV <br />
          </span>
        )
      case 'about': {
        const aboutInfo = {
          name: 'Krum Georgiev',
          currentPosition: 'Staff Software Engineer at Vercel',
          languages: 'JavaScript, TypeScript, Erlang, WebAssembly, Swift',
          frameworks:
            'React, Next.js, Node.js, Deno, Bun, Remix, Svelte, NestJS',
          tools: 'GitHub, GitLab, Bitbucket, Docker, CircleCI, AWS, Figma',
          softSkills: 'Agile Method, Teamwork, Communication, Problem-solving',
          favoriteIDEs: 'VS Code, Zed',
          city: 'Sofia, Bulgaria',
        }
        return <pre>{JSON.stringify(aboutInfo, null, 2)}</pre>
      }
      case 'exp':
      case 'experience':
        return (
          <span>
            <p>
              Ever since I was a kid, software development has been my passion.
              From BASIC on an Atari 800 to mastering various languages and
              frameworks, my journey led me to a BSc in Computer Science at New
              Bulgarian University.
            </p>
            <br />
            <p>
              With over 25 years in the industry, I have contributed to major
              projects at Meta, Bosch, BBC, CNN, Adobe, Google, and more.
            </p>
            <br />
            <p>
              My expertise lies in frontend technologies, focusing on user
              experience and innovative solutions. I thrive on tackling
              challenges and staying at the forefront of tech advancements.
            </p>
          </span>
        )
      case 'ls':
        if (!commandArguments) return ''
        if (commandArguments === '-a') {
          return (
            <div>
              <div>.bun</div>
              <div>.node-gyp</div>
              <div>.npm</div>
              <div>.yarn</div>
            </div>
          )
        } else if (commandArguments === '-lah') {
          return (
            <div>
              <div>drwxr-xr-x 4 krumgeorgiev wheel 384B Jun 4 09:52 .</div>
              <div>-rw-r--r-- 3 krumgeorgiev staff 18K May 23 23:18 .bun</div>
              <div>
                drwxr-xr-x 4 krumgeorgiev staff 569B Jun 2 16:44 .node-gyp
              </div>
              <div>drwxr-xr-x 5 krumgeorgiev staff 114K Jun 8 13:23 .npm</div>
              <div>drwxr-xr-x 7 krumgeorgiev staff 56K Jun 12 22:42 .yarn</div>
            </div>
          )
        } else {
          return `ls: illegal option -- ${commandArguments}. Nice try, maybe you should stick to '-a' or '-lah'.`
        }
      case 'cd': {
        const allowedDirs = ['.bun', '.node-gyp', '.npm', '.yarn']
        if (
          !commandArguments ||
          commandArguments === '..' ||
          commandArguments === ''
        ) {
          return "Oops! You can't escape that easily. Staying put in this directory!"
        }
        if (allowedDirs.includes(commandArguments)) {
          return `zsh: cd: ${commandArguments}: Permission denied`
        }
        return `cd: no such file or directory: ${commandArguments}`
      }
      case 'get': {
        if (commandArguments && commandArguments === 'cv') {
          return 'Coming soon!'
        }
        if (!commandArguments) {
          return 'get: missing argument, try "get cv"'
        }
        return `get: invalid argument: ${commandArguments}`
      }
      case 'sudo':
        if (!commandArguments || commandArguments === '') {
          return 'usage: sudo -h | -K | -k | -V'
        }
        if (commandArguments === 'rm -rf') {
          return 'Nope! Not falling for that one!'
        }
        return `sudo: a password is required, but sorry, I forgot it`
      default:
        return `zsh: command not found: ${command}`
    }
  }

  const welcomeMessage = showWelcomeMessage ? (
    <>
      <div className="container">
        <div className="header">
          <h2>Krum Georgiev</h2>
          <p>Tech enthusiast | Staff Engineer at Vercel | TC39 member</p>
        </div>
        <h2>Previously:</h2>
        <div className="header">
          <p>Principal Engineer at Facebook</p>
          <p>Lead Engineer at Adobe</p>
          <p>Senior Front End Engineer at Bosch</p>
        </div>
        <h2>More:</h2>
        <div className="header">
          <p>
            <a href="https://linkedin.com/in/krumgeorgiev">LinkedIn</a>
          </p>
          <p>
            <a>Download CV (soon)</a>
          </p>
        </div>
        <br />
        <h2>
          Type &quot;help&quot; or &quot;?&quot; for all available commands. Try
          &quot;about&quot; to learn more about me and &quot;exp&quot; to see my
          experience.
        </h2>
      </div>
    </>
  ) : null

  return (
    <TerminalContextProvider>
      <div className="terminal">
        {canRender && (
          <ReactTerminal
            theme="material-ocean"
            enableInput={inputEnabled}
            prompt="Krum:~/dev$"
            welcomeMessage={welcomeMessage}
            defaultHandler={(command: string, commandArguments: string) =>
              handleCommand(command, commandArguments)
            }
            errorMessage={(command: string) => {
              return `zsh: command not found: ${command}`
            }}
          />
        )}
      </div>
    </TerminalContextProvider>
  )
}
