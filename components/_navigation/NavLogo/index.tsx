import Link from 'next/link'
import Image from 'next/image'
import { type ImageT } from '@/types/general'

const NavLogo: React.FC<ImageT> = ({
  src,
  alt,
  width,
  height,
}) => {
  return (
    <Link
      data-cy='nav-logo'
      href='/'
      aria-label='Go to homepage'
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        data-cy='profile-image'
      />
    </Link>
  )
}

export default NavLogo