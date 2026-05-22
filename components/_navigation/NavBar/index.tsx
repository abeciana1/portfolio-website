import { payload } from '@/src/payload'
import { cache } from 'react'
import { NavLink as NavLinkI } from '@/src/payload-types'
import { NavLogo, NavLink, SocialLink, MobileMenu } from '@/components/_navigation'
import { CMSMediaT } from '@/types/general'

const fetchNavigationContent = cache(async () => {
  const result = await payload.find({
    collection: 'navigation-menu',
    depth: 1,
    limit: 1,
    pagination: false,
    overrideAccess: true,
    select: {
      logo: true,
      links: true,
      socialLinks: true,
    },
  })

  return result?.docs?.[0] ?? null
})

export type NavLinkType = Pick<NavLinkI, 'id' | 'link' | 'label'>

const NavBar = async () => {
  const navContentData = await fetchNavigationContent()

  if (!navContentData) {
    return null
  }

  const { logo } = navContentData

  if (!logo || typeof logo === 'number') {
    return null
  }

  const links: NavLinkType[] = navContentData.links
    .filter((link): link is Exclude<(typeof navContentData.links)[number], number> => typeof link !== 'number')
    .map(({ id, label, link }) => ({ id, label, link }))
  const socialLinks: NavLinkType[] = (navContentData.socialLinks ?? [])
    .filter(
      (link): link is Exclude<NonNullable<typeof navContentData.socialLinks>[number], number> =>
        typeof link !== 'number'
    )
    .map(({ id, label, link }) => ({ id, label, link }))

  const { webpUrl, alt, width, height } = logo as CMSMediaT

  if (!width || !height) {
    return null
  }

  return (
    <nav className="relative h-12 px-5 sm:px-10 my-4 flex items-center justify-center md:justify-between px-auto bg-background text-foreground dark:bg-foreground dark:text-background">
      <NavLogo src={webpUrl} alt={alt} width={width} height={height} />
      {links && links?.length > 0 && (
        <ul className="hidden md:flex items-center gap-16" data-test-id="navLinksList">
          {links?.map((link: NavLinkType, index) => {
            return <NavLink key={index} link={link.link as string} label={link.label as string} />
          })}
        </ul>
      )}
      {socialLinks && socialLinks?.length > 0 && (
        <ul data-test-id="socialLinksList" className="hidden md:flex items-center gap-4">
          {socialLinks?.map((link: NavLinkType, index) => {
            return (
              <SocialLink key={index} link={link.link as string} label={link.label as string} />
            )
          })}
        </ul>
      )}
      <div className="block md:hidden">
        <MobileMenu links={links} socialLinks={socialLinks} />
      </div>
    </nav>
  )
}

export default NavBar
