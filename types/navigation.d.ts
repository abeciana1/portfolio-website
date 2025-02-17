import {
  type NavigationMenu,
  type Media
} from '@/src/payload-types'
import { CMSMediaT } from '@/types/navigation'

export interface NavBarContentI extends NavigationMenu {
  logo?: CMSMediaT & Media
}