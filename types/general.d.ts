import {
  type Media,
  type Skill
} from '@/src/payload-types'

export type CMSMediaT = Media & {
  webpUrl: string
}

export type ImageT = CMSMediaT & {
  alt: string
  width: number
  height: number
}

export type HeadingProps = {
  text: string;
}

export type SkillProps = {
  title: string;
  skillIcon: CMSMediaT;
}