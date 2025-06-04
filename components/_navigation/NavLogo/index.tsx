import Link from 'next/link'
import Image from 'next/image'
import { type NavLogoT } from '@/types/navigation'

const NavLogo: React.FC<NavLogoT> = ({
  src,
  alt,
  width,
  height,
}) => {
  return (
    <div className='absolute md:relative border-solid border-1 border-zinc-200 dark:border-zinc-500 rounded-full max-w-14 left-4 top-4 md:left-0 md:top-0'>
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
          className='mx-auto scale-x-[-1] w-10 h-10'
        />
      </Link>
    </div>
  )
}

export default NavLogo