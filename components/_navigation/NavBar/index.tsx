import { payload } from '@/src/payload'
import { use } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { NavLink } from '@/src/payload-types'

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
  const {
    links
  } = navContentData?.docs[0]
  console.log('links', links)
  return (
    <nav>
    </nav>
  )
}

export default NavBar