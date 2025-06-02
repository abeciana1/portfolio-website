'use client'
import { useState } from 'react'
import Hamburger from 'hamburger-react'
import { MobileMenuI } from '@/types/navigation'
import { NavLinkType } from '@/components/_navigation/NavBar'
import SocialLink from '@/components/_navigation/SocialLink'
import NavLink from '@/components/_navigation/NavLink'

const MobileMenu: React.FC<MobileMenuI> = ({
  links,
  socialLinks
}) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <div data-testid='mobile-btn' className='absolute right-2 top-4'>
        <Hamburger
          toggle={setOpen}
          toggled={isOpen}
          direction='right'
        />
      </div>
      {isOpen &&
        <div
          className='bg-background relative flex flex-col items-center top-24'
        >
          <ul
            key='menu-link-list'
            className='flex flex-col items-center gap-4'
            data-testid='navLinksList'
          >
            {links?.map((link: NavLinkType, index) => {
              return (
                <>
                  <NavLink
                    key={`mobile-link-${link?.label}-${index}`}
                    link={link.link as string}
                    label={link.label as string}
                  />
                </>
              )
            })}
          </ul>
          <ul
            data-testid='socialLinksList'
            className='flex items-center mt-8 gap-4'
          >
            {socialLinks?.map((link: NavLinkType, index) => {
              return (
                <>
                  <SocialLink
                    key={`social-link-${link?.label}-${index}`}
                    link={link.link as string}
                    label={link.label as string}
                    size={40}
                  />
                </>
              )
            })}
          </ul>
        </div>
      }
    </>
  )
}

export default MobileMenu