import React, { useCallback, useContext, useEffect } from 'react'

import { TerminalContext } from 'react-terminal'

type Props = {
  command: string
  commandArguments: string
  setShowWelcomeMessage: React.Dispatch<React.SetStateAction<boolean>>
}

const CommandHandler = ({
  command,
  commandArguments,
  setShowWelcomeMessage,
}: Props) => {
  const { setBufferedContent } = useContext(TerminalContext)

  const handleClear = useCallback(
    (event?: KeyboardEvent) => {
      setShowWelcomeMessage(!event || event.key === 'Escape' ? true : false)
      setBufferedContent('')
    },
    [setShowWelcomeMessage, setBufferedContent],
  )

  useEffect(() => {
    if (command === 'home') handleClear()
    else setShowWelcomeMessage(false)
  }, [command, handleClear, setShowWelcomeMessage])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (
        ((event.metaKey || event.ctrlKey) && event.key === 'k') ||
        event.key === 'Escape'
      ) {
        handleClear(event)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
  }, [handleClear])

  const renderHelp = () => (
    <ul className="list-none p-0">
      <li className="mb-1">
        <span className="font-bold text-cyan-400">home</span> - a fresh start
        <span className="text-gray-400"> (also hit Esc)</span>
      </li>
      <li className="mb-1">
        <span className="font-bold text-cyan-400">clear</span> - clears the
        console
        <span className="text-gray-400"> (hitting Cmd+K)</span>
      </li>
      <li className="mb-1">
        <span className="font-bold text-cyan-400">about</span> - info about me
        (no juicy details)
      </li>
      <li className="mb-1">
        <span className="font-bold text-cyan-400">exp</span> - my experience
        (where I&apos;ve been and what I&apos;ve conquered)
      </li>
    </ul>
  )

  const commands = {
    help: renderHelp,
    '?': renderHelp,
    about: () => {
      const jsonObject = {
        name: 'Krum Georgiev',
        currentPosition: 'Principal Engineer at Vercel',
        languages: 'JavaScript, TypeScript, Erlang, WebAssembly, Swift',
        frameworks: 'React, Next.js, Node.js, Deno, Bun, Remix, Svelte, NestJS',
        tools: 'GitHub, GitLab, Bitbucket, Docker, CircleCI, AWS, Figma',
        softSkills: 'Agile Method, Teamwork, Communication, Problem-solving',
        favoriteIDEs: 'VS Code, Zed',
        city: 'Sofia, Bulgaria',
      }

      const styledJson = (
        json: { [s: string]: unknown } | ArrayLike<unknown>,
      ) => {
        return (
          <span className="json-container text-sm">
            {Object.entries(json).map(([key, value], index) => (
              <div key={key} className="ml-5">
                <span className="text-cyan-400">&quot;{key}&quot;: </span>
                <span className="text-yellow-400">
                  &quot;{String(value)}&quot;
                </span>
                {index < Object.entries(json).length - 1 && ','}
              </div>
            ))}
          </span>
        )
      }

      return <pre>{styledJson(jsonObject)}</pre>
    },
    exp: () => (
      <span>
        <p>
          Ever since I was a kid, software development has been my passion. From
          BASIC on an Atari 800 to mastering various languages and frameworks,
          my journey led me to a BSc in Computer Science at New Bulgarian
          University.
        </p>
        <br />
        <p>
          With over 25 years in the industry, I have contributed to major
          projects at Meta, Bosch, BBC, CNN, Adobe, Google, and more.
        </p>
        <br />
        <p>
          My expertise lies in frontend technologies, focusing on user
          experience and innovative solutions. I thrive on tackling challenges
          and staying at the forefront of tech advancements.
        </p>
      </span>
    ),
    ls: () => {
      if (!commandArguments) return 'app'
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
    },
    cd: () => {
      const allowedDirs = ['.bun', '.node-gyp', '.npm', '.yarn', 'app']
      if (!commandArguments || commandArguments === '..') {
        return "Oops! You can't escape that easily. Staying put in this directory!"
      }
      if (allowedDirs.includes(commandArguments)) {
        return `zsh: cd: ${commandArguments}: Permission denied`
      }
      return `cd: no such file or directory: ${commandArguments}`
    },
    sudo: () => {
      if (!commandArguments) {
        return 'usage: sudo -h | -K | -k | -V'
      }
      if (commandArguments === 'rm -rf') {
        return 'Nope! Not falling for that one!'
      }
      return `sudo: a password is required, but sorry, I forgot it`
    },
  }

  return commands[command]
    ? commands[command]()
    : `zsh: command not found: ${command}`
}

export default CommandHandler
