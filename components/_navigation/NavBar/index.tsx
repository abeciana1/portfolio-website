import { payload } from '@/src/payload'
import { use } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { NavLink as NavLinkI } from '@/src/payload-types'
import {
  NavLogo,
  NavLink
} from '@/components/_navigation'
import { NavBarContentI } from '@/types/navigation'

const fetchNavigationContent = async (queryClient: QueryClient) => {
  return await queryClient.ensureQueryData({
    queryKey: ['navigation'],
    queryFn: () => payload.find({
      collection: 'navigation-menu',
      overrideAccess: true
    }),
    staleTime: process.env.NODE_ENV === 'production' ? 60 * 1000 * 10 * 3 : 60 * 1000
  })
}

type NavLinkType = Pick<NavLinkI, 'id' | 'link' | 'label'>

const NavBar = () => {
  const queryClient = new QueryClient()
  const navContentData = use(fetchNavigationContent(queryClient))
  const {
    logo,
    links,
    socialLinks
  } = navContentData?.docs[0] as NavBarContentI
  console.log('links', links)

  const {
    webpUrl,
    alt,
    width,
    height
  } = logo
  return (
    <nav className='relative px-5 sm:px-10 py-4 flex items-center justify-between'>
      <NavLogo
        src={webpUrl}
        alt={alt}
        width={width}
        height={height}
      />
      {links && (links?.length > 0) &&
        <ul
          className='flex items-center gap-16'
          data-test-id='navLinksList'
        >
          {links?.map((link: NavLinkType, index) => {
            return (
              <NavLink
                key={index}
                link={link.link as string}
                label={link.label as string}
              />
            )
          })}
        </ul>
      }
      {socialLinks && (socialLinks?.length > 0) &&
        <ul data-test-id='socialLinksList'>
        </ul>
      }
    </nav>
  )
}

export default NavBar