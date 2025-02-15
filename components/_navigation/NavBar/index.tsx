import { use } from 'react'
import { payload } from '@/src/payload'

const NavBar = () => {
  const navContentData = use(payload.find({
    collection: 'navigation-menu',
    overrideAccess: true,
  }))
  console.log('navContentData', navContentData)
  return (
    <></>
  )
}

export default NavBar