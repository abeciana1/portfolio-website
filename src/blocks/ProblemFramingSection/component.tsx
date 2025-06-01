import Pill from '@/components/_styled/Pill'
import { Heading1 } from '@/components/_styled/Heading'
import {
  type ProblemFramingSectionBlockProps,
  type GradientOptions
} from '@/types/blockTypes'
import clsx from 'clsx'
import ProblemFrameCard from '@/components/_projects/ProblemFrameCard'
import Gradient from '@/components/_styled/Gradient'

const ProblemFramingSection: React.FC<ProblemFramingSectionBlockProps> = ({
  sectionId,
  pill,
  heading,
  description,
  greyBackground,
  problems,
  gradient,
  gradientSelect
}) => {
  return (
    <section
      data-testid={sectionId as string}
      id={sectionId as string}
      className={clsx('relative z-50 lg:py-24 px-5 py-10 space-y-6', {
        ['bg-pillGrey dark:bg-darkGrey']: greyBackground
      })}
    >
      <section className='relative flex flex-col gap-6 z-40 text-center md:max-w-2xl mx-auto'>
        {pill &&
          <div data-testid='problem-pill' className='flex justify-center'>
            <Pill text={pill as string} />
          </div>
        }
        <Heading1 text={heading} />
        <div data-testid='problem-desc' className='text-darkGrey dark:text-pillGrey text-xl font-semibold'>
          {description}
        </div>
      </section>
      <section
        className="relative grid grid-cols-1 md:grid-cols-2 gap-6 px-5 lg:px-20 lg:max-w-[1000px] mx-auto"
      >
        {gradient && (
          <div
            className="absolute top-1/5 left-5 lg:left-1/4 rounded-full h-64 w-[45rem] blur-3xl opacity-70 z-0"
          >
            <Gradient variant={gradientSelect as GradientOptions} />
          </div>
        )}
        {problems?.map((problem, index) => {
          return (
            <ProblemFrameCard
              key={`${problem.frame}-${index}`}
              frame={problem?.frame}
              description={problem?.description}
            />
          )
        })}
      </section>
    </section>
  )
}

export default ProblemFramingSection