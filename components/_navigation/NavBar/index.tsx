import { payload } from '@/src/payload'
import { use } from 'react';
import { QueryClient } from '@tanstack/react-query';
// import { NavLink } from '@/src/payload-types'
import { NavLogo } from '@/components/_navigation'
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

const NavBar = () => {
  const queryClient = new QueryClient()
  const navContentData = use(fetchNavigationContent(queryClient))
  console.log('navContentData', navContentData)
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
    <nav className='relative'>
      <NavLogo
        src={webpUrl}
        alt={alt}
        width={width}
        height={height}
      />
    </nav>
  )
}

export default NavBar