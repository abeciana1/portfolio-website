import Link from 'next/link'
import { NavLinkType } from '@/components/_navigation/NavLink'
import 'clsx'
import {
  FaBehanceSquare,
  FaGithubSquare,
  FaLinkedin
} from "react-icons/fa";

interface SocialLinkI extends NavLinkType {
  size?: number; // Icon size in pixels (default 25)
}

const SocialLink: React.FC<SocialLinkI> = ({
  link,
  label,
  size = 25
}) => {
  return (
    <Link
      href={link}
      aria-label={label}
      target='_blank'
      className='text-foreground dark:text-background'
    >
      {label === 'LinkedIn' &&
        <FaLinkedin size={size} />
      }
      {label === 'GitHub' &&
        <FaGithubSquare size={size} />
      }
      {label === 'Behance' && 
        <FaBehanceSquare size={size} />
      }
    </Link>
  )
}

export default SocialLink