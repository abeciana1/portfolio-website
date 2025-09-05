import {
  type Media
} from '@/src/payload-types'
import React from 'react'

export type CMSMediaT = Media & {
  webpUrl: string;
  url: string;
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
  children: React.ReactNode[];
  alignment?: 'center' | 'left';
}

export type ProjectLink = {
  label: string;
  link: string;
}

export interface WrapperI {
  children: React.ReactNode | React.ReactNode[];
}

export type ShareBtnProps = {
  text: string;
  icon: React.ElementType;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}