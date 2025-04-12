import Link from 'next/link'
import { type CallToActionProps } from '@/types/blockTypes'
import clsx from 'clsx'

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
  return (
    <Link>

    </Link>
  )
}

export default CallToAction