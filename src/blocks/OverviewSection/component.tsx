import { type OverviewSectionBlockProps } from '@/types/blockTypes'
import { Heading1 } from '@/components/_styled/Heading'

const OverviewSection: React.FC<OverviewSectionBlockProps> = ({
  title,
  content_html,
  role,
  duration,
  tags
}) => {
  return (
    <section
      data-testid='overview-section'
      id='overview-section'
      className='relative z-50 lg:py-24 px-5 py-10'
    ></section>
  )
}

export default OverviewSection