import {
  type HeroSection,
  type SkillBlock
} from '@/src/payload-types'

type InnerContainer = {
  disableInnerContainer?: boolean;
}

export type HeroSectionProps = HeroSection & InnerContainer

export type SkillProps = SkillBlock & InnerContainer