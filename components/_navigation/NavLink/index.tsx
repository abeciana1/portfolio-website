'use client'
import { usePathname } from 'next/navigation'
import { type NavLink as NavLinkI } from '@/src/payload-types'
import Link from 'next/link'
import clsx from 'clsx'

export type NavLinkType = Pick<NavLinkI, 'link' | 'label'>

const NavLink: React.FC<NavLinkType> = ({ label, link }) => {
  const pathname = usePathname()
  const isActive = pathname === link
  return (
    <li>
      <Link
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
