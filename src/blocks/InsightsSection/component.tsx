import {
  type InsightsSectionBlockProps
} from '@/types/blockTypes'
import { Heading1 } from '@/components/_styled/Heading'
import Insight from '@/components/_projects/Insight'

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
      className='px-5 md:px-10 space-y-6 py-10 lg:py-24'
    >
      <Heading1 text={heading} />
      <div data-testid='insight-desc' className='text-darkGrey dark:text-pillGrey text-xl font-semibold lg:w-1/2'>
        {description}
      </div>
      <section
        className='flex flex-col md:flex-row items-center gap-6'
      >
        <div
          className='min-w-80 max-w-80 h-80 relative p-6 rounded-2xl bg-pillGrey/50 dark:bg-darkGrey/50 flex justify-center items-center text-5xl'
        >🤔</div>
        {insights &&
          <ul aria-label='insight-list' className='space-y-6'>
            {insights?.map((insight, index) => {
              return (
                <Insight
                  key={`insight-${insight.title}-${index}`}
                  title={insight.title}
                  body={insight.body}
                />
              )
            })}
          </ul>
        }
      </section>
    </section>
  )
}

export default InsightsSection