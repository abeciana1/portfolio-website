import {
  type UserResearchSectionBlockProps,
  type GradientOptions
} from '@/types/blockTypes'
import Pill from '@/components/_styled/Pill'
import { Heading1 } from '@/components/_styled/Heading'
import Gradient from '@/components/_styled/Gradient'
import UserResearchCard from '@/components/_projects/UserResearchCard'

const UserResearchSection: React.FC<UserResearchSectionBlockProps> = ({
  sectionId,
  pill,
  heading,
  description,
  research,
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
          <div data-testid='research-pill' className='flex justify-center'>
            <Pill text={pill as string} />
          </div>
        }
        <Heading1 text={heading} />
        <div data-cursor-variant="callToAction" data-cursor-pointer="text" data-testid='research-desc' className='text-darkGrey dark:text-pillGrey text-xl font-semibold'>
          {description}
        </div>
      </section>
      <section
        className="relative gap-6 px-5 lg:px-20 grid grid-cols-1 sm:[grid-template-columns:repeat(2,minmax(16rem,16rem))] place-content-center"
      >
        {gradient && (
          <div
            className="absolute top-1/5 left-5 lg:left-1/4 rounded-full h-64 w-[45rem] blur-3xl opacity-70 z-0"
          >
            <Gradient variant={gradientSelect as GradientOptions} />
          </div>
        )}
        {gradient && (
          <div
            className="absolute bottom-0 left-5 lg:left-1/4 rounded-full h-64 w-[45rem] blur-3xl opacity-70 z-0 sm:hidden"
          >
            <Gradient variant={gradientSelect as GradientOptions} />
          </div>
        )}
        {research?.map((research, index) => {
          return (
            <UserResearchCard
              key={`research-${research.researchType}-${index}`}
              researchType={research.researchType}
              numberMetric={research.numberMetric}
            />
          )
        })}
      </section>
    </section>
  )
}

export default UserResearchSection