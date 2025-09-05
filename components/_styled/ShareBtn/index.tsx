'use client'
import { type ShareBtnProps } from '@/types/general'
import { variants } from '@/src/blocks/CallToAction/component'
import clsx from 'clsx'
import { useHover } from "@uidotdev/usehooks"

const TooltipMessage: React.FC<Pick<ShareBtnProps, 'text'>> = ({
  text
}) => {
  return (
    <span data-testid='tooltip' className={clsx(variants['primary'], 'absolute text-xl rounded-md px-1 py-1 top-1.5 left-15')}>
      { text }
    </span>
  )
}

const ShareBtn: React.FC<ShareBtnProps> = ({
  text,
  icon,
  onClick
}) => {

  const Icon = icon as React.ElementType

  const [ref, hovering] = useHover()

  return (
    <span className='flex items-center gap-6'>
      <button
        ref={ref}
        aria-label={text}
        className={clsx(variants['primary'], 'rounded-full p-3')}
        onClick={onClick}
      >
        <Icon size={24} />
      </button>
      {hovering && <TooltipMessage text={text} />}
    </span>
  )
}

export default ShareBtn