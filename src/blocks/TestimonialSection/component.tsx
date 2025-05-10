import {
  type TestimonialSectionProps
} from '@/types/blockTypes'
import Pill from '@/components/_styled/Pill'
import { Heading1 } from '@/components/_styled/Heading'
import Testimonial from '@/components/_styled/Testimonial'
import {
  Carousel,
  CarouselContent,
  CarouselNavigation,
  CarouselItem,
  CarouselIndicator
} from '@/components/motion-primitives/carousel'

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
      className='relative z-50'
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
      {(testimonials && testimonials?.length > 0) &&
        <div className='relative w-full max-w-fit mx-auto'>
          <Carousel>
            <CarouselContent>
              {testimonials?.map((testimonial) => {
                return (
                  <CarouselItem key={testimonial.name}>
                    <Testimonial
                      name={testimonial?.name}
                      position={testimonial?.position}
                      company={testimonial?.company}
                      headshot={testimonial?.headshot}
                      callout={testimonial?.callout}
                      content_html={testimonial?.content_html}
                    />
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselNavigation alwaysShow />
            <CarouselIndicator
              className='relative my-6'
            />
          </Carousel>
        </div>
      }
    </section>
  )
}

export default TestimonialSection