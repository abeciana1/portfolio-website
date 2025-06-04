import {
  type NavigationMenu,
  type Media,
  type NavLink as NavLinkI
} from '@/src/payload-types'
import { CMSMediaT } from '@/types/navigation'

type NavLinkType = Pick<NavLinkI, 'id' | 'link' | 'label'>

export interface MobileMenuI {
  links: NavLinkType[];
  socialLinks: NavLinkType[];
}

export interface NavBarContentI extends NavigationMenu {
  logo?: CMSMediaT & Media;
  links: NavLinkType[];
  socialLinks: NavLinkType[];
}

export type NavLogoT = {
  src: string;
  alt: string;
  width: number;
  height: number;
}