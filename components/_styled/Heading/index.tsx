import { HeadingProps } from '@/types/general'

export const Heading1: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h1 className='text-5xl'>
      { text}
    </h1>
  )
}

export const Heading2: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h2 className='text-4xl'>
      { text }
    </h2>
  )
}

export const Heading3: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h3 className='text-3xl'>
      { text }
    </h3>
  )
}

export const Heading4: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h4 className='text-2xl'>
      { text }
    </h4>
  )
}

export const Heading5: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h5 className='text-xl'>
      { text }
    </h5>
  )
}

export const Heading6: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h6 className='text-lg'>
      { text }
    </h6>
  )
}