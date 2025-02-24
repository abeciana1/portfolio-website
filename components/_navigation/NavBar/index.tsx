import { payload } from '@/src/payload'
import { QueryClient } from '@tanstack/react-query';
import { NavLink as NavLinkI } from '@/src/payload-types'
import {
  NavLogo,
  NavLink,
  SocialLink,
  MobileMenu
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

export type NavLinkType = Pick<NavLinkI, 'id' | 'link' | 'label'>

const NavBar = async () => {
  const queryClient = new QueryClient()
  const navContentData = await fetchNavigationContent(queryClient)
  console.log('navContentData', navContentData)
  const {
    logo,
    links,
    socialLinks
  } = navContentData?.docs[0] as NavBarContentI

  const {
    webpUrl,
    alt,
    width,
    height
  } = logo
  return (
    <nav className='relative px-5 sm:px-10 py-4 flex items-center justify-center md:justify-between max-w-6xl mx-auto'>
      <NavLogo
        src={webpUrl}
        alt={alt}
        width={width}
        height={height}
      />
      {links && (links?.length > 0) &&
        <ul
          className='hidden md:flex items-center gap-16'
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
        <ul
          data-test-id='socialLinksList'
          className='hidden md:flex items-center gap-4'
        >
          {socialLinks?.map((link: NavLinkType, index) => {
            return (
              <SocialLink
                key={index}
                link={link.link as string}
                label={link.label as string}
              />
            )
          })}
        </ul>
      }
      <div
        className='block md:hidden'
      >
        <MobileMenu
          links={links}
          socialLinks={socialLinks}
        />
      </div>
    </nav>
  )
}

export default NavBar