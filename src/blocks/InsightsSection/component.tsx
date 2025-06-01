import {
  type InsightsSectionBlockProps
} from '@/types/blockTypes'
import { Heading1 } from '@/components/_styled/Heading'

const InsightsSection: React.FC<InsightsSectionBlockProps> = ({
  sectionId,
  pill,
  heading,
  description,
  insights
}) => {
  return (
    <section
      data-testid={sectionId as string}
      id={sectionId as string}
    >
      <Heading1 text={heading} />
      <div data-testid='insights-desc' className='text-darkGrey dark:text-pillGrey text-xl font-semibold'>
        {description}
      </div>
      <section>
        <div></div>
        {insights &&
          <ul></ul>
        }
      </section>
    </section>
  )
}

export default InsightsSection