import Link from 'next/link'
import { type CallToActionProps } from '@/types/blockTypes'
import clsx from 'clsx'
import { ArrowRight, ArrowDown } from 'lucide-react';


const variants = {
  'primary': 'bg-foreground dark:bg-background text-background dark:text-foreground',
  'secondary': 'bg-background dark:bg-foreground border-2 border-foreground dark:border-background text-foreground dark:text-background',
  'tertiary': 'bg-background dark:bg-foreground opacity-70 blur-2xl text-foreground dark:text-background',
  'noBackground': 'bg-transparent text-foreground dark:text-background'
}

const CallToAction: React.FC<CallToActionProps> = ({
  style,
  arrow,
  arrowDirection,
  link
}) => {
  const {
    type,
    newTab,
    url,
    reference,
    label
  } = link

  const pageUrl = type === 'reference' ? (reference[0]?.value?.slug === 'home' ? '' : reference[0]?.value?.slug) : url

  return (
    <Link
      prefetch
      target={newTab ? "_blank" : "_parent"}
      href={`/${pageUrl}`}
      className={clsx('flex items-center rounded-md text-lg font-medium py-2 px-6 no-underline', {
        ['gap-3 justify-between pl-7']: arrow && arrowDirection,
        [variants[style]]: style
      })}
    >
      { label }
      {(arrow && arrowDirection) &&
        <>
          {arrowDirection === 'right' && <ArrowRight className='text-inherit' size={25} />}
          {arrowDirection === 'down' && <ArrowDown className='text-inherit' size={25} />}
        </>
      }
    </Link>
  )
}

export default CallToAction