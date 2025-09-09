'use client'
import { useCallback } from 'react'
import Link from 'next/link'
import { type CallToActionProps } from '@/types/blockTypes'
import clsx from 'clsx'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { usePostHog } from 'posthog-js/react'
import { usePathname } from 'next/navigation'

export const variants = {
  'primary': 'bg-foreground dark:bg-background text-background dark:text-foreground',
  'secondary': 'bg-background dark:bg-foreground border-2 border-foreground dark:border-background text-foreground dark:text-background',
  'tertiary': 'bg-background dark:bg-foreground opacity-70 blur-2xl text-foreground dark:text-background',
  'noBackground': 'bg-transparent text-foreground dark:text-background'
}

const CallToAction: React.FC<CallToActionProps> = ({
  style,
  arrow,
  arrowDirection,
  link,
  eventLocation,
  cursorLabel = ''
}) => {
  const {
    type,
    newTab,
    url,
    reference,
    label
  } = link

  const pathname = usePathname
  const posthog = usePostHog()
  const userId = posthog.get_distinct_id()

  const clickTrackHandler = useCallback(() => {
    posthog.capture('link_clicked', {
      destinationSlug: url,
      eventLocation: eventLocation,
      ctaStyle: style,
      userId: userId,
      label: label,
      pageLocation: pathname
    })
  }, [eventLocation, pathname, label, url, style, userId, posthog])

  const pageUrl = type === 'reference' ? (reference[0]?.value?.slug === 'home' ? '' : reference[0]?.value?.slug) : url

  return (
    <Link
      data-cursor={cursorLabel}
      prefetch
      target={newTab ? "_blank" : "_parent"}
      href={`/${pageUrl}`}
      className={clsx('flex items-center rounded-md text-lg font-medium py-2 px-6 no-underline max-w-fit', {
        ['gap-3 justify-between pl-7']: arrow && arrowDirection,
        [variants[style]]: style
      })}
      onClick={clickTrackHandler}
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