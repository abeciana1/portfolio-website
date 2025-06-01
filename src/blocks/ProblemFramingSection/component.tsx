import Pill from '@/components/_styled/Pill'
import { Heading1 } from '@/components/_styled/Heading'
import { type ProblemFramingSectionBlockProps } from '@/types/blockTypes'
import clsx from 'clsx'

const ProblemFramingSection: React.FC<ProblemFramingSectionBlockProps> = ({
  sectionId,
  pill,
  heading,
  description,
  greyBackground,
  problems
}) => {
  return (
    <section
      data-testid={sectionId as string}
      id={sectionId as string}
      className={clsx('relative z-50 lg:py-24 px-5 py-10', {
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
      <section></section>
    </section>
  )
}

export default ProblemFramingSection