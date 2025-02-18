import Link from 'next/link'
import { NavLinkType } from '@/components/_navigation/NavLink'
import 'clsx'
import {
  FaBehanceSquare,
  FaGithubSquare,
  FaLinkedin
} from "react-icons/fa";

const SocialLink: React.FC<NavLinkType> = ({
  link,
  label
}) => {
  const size = 25
  return (
    <Link
      href={link}
      aria-label={label}
      target='_blank'
      className='text-foreground'
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