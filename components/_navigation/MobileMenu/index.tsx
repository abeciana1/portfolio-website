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
          {links && (links?.length > 0) &&
            <ul
              className='flex flex-col items-center gap-4'
              data-testid='navLinksList'
            >
              {links?.map((link: NavLinkType, index) => {
                return (
                  <>
                    <NavLink
                      key={index + link?.label}
                      link={link.link as string}
                      label={link.label as string}
                    />
                  </>
                )
              })}
            </ul>
          }
          {socialLinks && (socialLinks?.length > 0) &&
            <ul
              data-testid='socialLinksList'
              className='flex items-center mt-8 gap-4'
            >
              {socialLinks?.map((link: NavLinkType, index) => {
                return (
                  <>
                    <SocialLink
                      key={index + link?.label}
                      link={link.link as string}
                      label={link.label as string}
                      size={40}
                    />
                  </>
                )
              })}
            </ul>
          }
        </div>
      }
    </>
  )
}

export default MobileMenu