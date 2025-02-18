'use client'
import { usePathname } from 'next/navigation'
import { type NavLink as NavLinkI } from '@/src/payload-types'
import Link from 'next/link'
import clsx from 'clsx'

type NavLinkType = Pick<NavLinkI, 'link' | 'label'>

const NavLink: React.FC<NavLinkType> = ({ label, link }) => {
  const pathname = usePathname()
  const isActive = pathname === link
  return (
    <li>
      <Link
        href={link as string}
        className={clsx('text-base', {
          ['text-foreground']: isActive,
          ['text-foreground opacity-70']: !isActive,
        })}
      >
        {label}
      </Link>
    </li>
  )
}

export default NavLink
