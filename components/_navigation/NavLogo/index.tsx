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
    <div className='border-solid border-[1px] border-zinc-200 rounded-full max-w-14'>
      <Link
        data-cy='nav-logo'
        href='/'
        aria-label='Go to homepage'
        className=''
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          data-cy='profile-image'
          className='scale-x-[-1] w-14 h-14'
        />
      </Link>
    </div>
  )
}

export default NavLogo