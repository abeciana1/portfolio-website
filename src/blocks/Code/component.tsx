'use client'
import { useMemo, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import '@/styles/notion-code.css'
import { type CodeBlockProps } from '@/types/blockTypes'
import clsx from 'clsx'

const MAX_HEIGHT = 300
const LINE_THRESHOLD = 20

const Code: React.FC<CodeBlockProps> = ({ code = '', language = '' }) => {
  const [expanded, setExpanded] = useState(false)

  const lineCount = useMemo(() => (code ? code.split('\n').length : 0), [code])
  const isLong = lineCount > LINE_THRESHOLD

  if (!code) return null

  return (
    <section className="my-6">
      <div
        className={clsx(
          'relative rounded-md border',
          !expanded && isLong && 'overflow-hidden'
        )}
        style={!expanded && isLong ? { maxHeight: MAX_HEIGHT } : undefined}
      >
        <SyntaxHighlighter language={language} className="!m-0 notion-code">
          {code}
        </SyntaxHighlighter>

        {!expanded && isLong && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent" />
        )}
      </div>

      {isLong && (
        <button
          data-cursor-pointer='pointer'
          data-cursor-variant='callToAction'
          data-cursor={expanded ? 'Show less' : 'Show more'}
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((p) => !p)}
          className="mt-2 text-sm font-medium text-foreground"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </section>
  )
}

export default Code
