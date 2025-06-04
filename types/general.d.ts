import {
  type Media
} from '@/src/payload-types'
import React from 'react'

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

export type ButtonGroupProps = {
  children: React.ReactNode[]
}

export type ProjectLink = {
  label: string;
  link: string;
}

export interface WrapperI {
  children: React.ReactNode | React.ReactNode[];
}