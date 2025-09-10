import {
  type OutcomesSectionBlockProps,
  type GradientOptions
} from '@/types/blockTypes'
import Pill from '@/components/_styled/Pill'
import { Heading1 } from '@/components/_styled/Heading'
import Gradient from '@/components/_styled/Gradient'
import OutcomeCard from '@/components/_projects/OutcomeCard'

const OutcomesSection: React.FC<OutcomesSectionBlockProps> = ({
  sectionId,
  pill,
  heading,
  description,
  outcomes,
  gradient,
  gradientSelect
}) => {
  return (
    <section
      data-testid={sectionId as string}
      id={sectionId as string}
      className='relative z-50 lg:py-24 px-5 py-10 space-y-6'
    >
      <section className='relative flex flex-col gap-6 z-40 text-center md:max-w-2xl mx-auto'>
        {pill &&
          <div data-testid='outcome-pill' className='flex justify-center'>
            <Pill text={pill as string} />
          </div>
        }
        <Heading1 text={heading} />
        <div data-cursor-pointer='text' data-testid='outcome-desc' className='text-darkGrey dark:text-pillGrey text-xl font-semibold'>
          {description}
        </div>
      </section>
      <section
        className="relative grid grid-cols-1 sm:[grid-template-columns:repeat(2,minmax(16rem,16rem))] lg:[grid-template-columns:repeat(3,minmax(16rem,16rem))] gap-6 px-5 lg:px-20 lg:max-w-[1000px] mx-auto place-content-center"
      >
        {gradient && (
          <div
            className="absolute top-1/5 left-5 lg:left-1/4 rounded-full h-64 w-[45rem] blur-3xl opacity-70 z-0"
          >
            <Gradient variant={gradientSelect as GradientOptions} />
          </div>
        )}
        {outcomes?.map((result, index) => {
          return (
            <OutcomeCard
              key={`${result?.resultType}-${index}`}
              resultType={result?.resultType}
              emojis={result?.emojis}
              stats={result?.stats}
            />
          )
        })}
      </section>
    </section>
  )
}

export default OutcomesSection