import { type ProblemFrameProps } from '@/types/blockTypes'
import React from 'react'

const frameHash = {
  'who': 'Who',
  'where': 'Where',
  'when': 'When',
  'why': 'Why'
}

const emojiHash = {
  'who': '🤔',
  'where': '⏰',
  'when': '📍',
  'why': '❤️',
}

const ProblemFrameCard: React.FC<ProblemFrameProps> = ({
  frame,
  description
}) => {
  return (
    <div
    className='relative p-6 rounded-2xl bg-background/50 dark:bg-foreground/50 h-auto max-h-[412px]'
    >
      <div className='relative z-50 opacity-100 space-y-6'>
        <div
          data-testid='frame-heading'
          className='flex justify-between'
        >
          <div>{frameHash[frame]}</div>
          <div>{emojiHash[frame]}</div>
        </div>
        <div>{description}</div>
      </div>
    </div>
  )
}

export default ProblemFrameCard