import {
  type TestimonialSectionProps
} from '@/types/blockTypes'
import { Carousel } from '@/components/motion-primitives/carousel'
import Pill from '@/components/_styled/Pill'
import { Heading1 } from '@/components/_styled/Heading'

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  sectionId,
  pill,
  heading,
  description,
  testimonials
}) => {
  return (
    <section
      data-testid={sectionId as string}
      id={sectionId as string}
    >
      <div className='relative flex flex-col gap-6 z-40 text-center md:max-w-2xl mx-auto'>
        <div className='flex justify-center'>
          <Pill text={pill as string} />
        </div>
        <Heading1 text={heading} />
        <div className='text-darkGrey dark:text-pillGrey text-xl font-semibold'>
          {description}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection