'use client'
import { usePathname } from 'next/navigation'
import { type NavLink as NavLinkI } from '@/src/payload-types'
import Link from 'next/link'
import clsx from 'clsx'
import { sendGAEvent } from '@next/third-parties/google'

export type NavLinkType = Pick<NavLinkI, 'link' | 'label'> & {
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkType> = ({ label, link, onClick }) => {
  const pathname = usePathname()
  const isActive = pathname === link
  return (
    <li onClick={() => {
      sendGAEvent('event', 'navLinkClick', { value: { page: label }})
      if (onClick) {
        onClick()
      }
      
    }}>
      <Link
        prefetch
        aria-label={label}
        href={link as string}
        className={clsx('text-lg', {
          ['text-foreground dark:text-background underline underline-offset-8']: isActive,
          ['text-foreground dark:text-background opacity-70']: !isActive,
        })}
      >
        {label}
      </Link>
    </li>
  )
}

export default NavLink
