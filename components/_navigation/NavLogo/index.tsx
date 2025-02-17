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
      href='/'
      aria-label='Go to homepage'
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </Link>
  )
}

export default NavLogo