'use client'
import { type ShareBtnProps } from '@/types/general'
import { variants } from '@/src/blocks/CallToAction/component'
import clsx from 'clsx'
import { useHover } from "@uidotdev/usehooks"

const TooltipMessage: React.FC<Pick<ShareBtnProps, 'text'>> = ({
  text
}) => {
  return (
    <span className={variants['primary']}>
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
    <span ref={ref} className='flex items-center'>
      <button
        className={clsx(variants['primary'], 'rounded-full gap-6')}
        onClick={onClick}
      >
        <Icon size={24} />
        {hovering && <TooltipMessage text={text} />}
      </button>
    </span>
  )
}

export default ShareBtn