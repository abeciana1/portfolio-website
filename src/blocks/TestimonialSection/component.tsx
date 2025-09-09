import {
  type TestimonialSectionProps,
  type GradientOptions
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
import Gradient from '@/components/_styled/Gradient'

const TestimonialSection: React.FC<TestimonialSectionProps> = ({
  sectionId,
  pill,
  heading,
  description,
  testimonials,
  gradient,
  gradientSelect,
  carouselCustom = false,
  enableInfinite,
  carouselTimer,
  secondsTimer
}) => {
  return (
    <section
      data-cursor="Don't take my for it!"
      data-cursor-variant="section"
      data-testid={sectionId as string}
      id={sectionId as string}
      className='relative z-50 lg:py-24 px-5 py-10'
    >
      {gradient &&
        <div
          className='z-0 absolute top-1/5 left-5 lg:left-1/4 rounded-full h-64 sm:h-[10rem] md:h-[20rem] w-[45rem] overflow-hidden blur-3xl sm:opacity-70'
        >
          <Gradient
            variant={gradientSelect as GradientOptions}
          />
        </div>
      }
      <div className='relative flex flex-col gap-6 z-40 text-center md:max-w-2xl mx-auto'>
        <div data-testid='testimonials-pill' className='flex justify-center'>
          <Pill text={pill as string} />
        </div>
        <Heading1 text={heading} />
        <div data-testid='testimonials-desc' className='text-darkGrey dark:text-pillGrey text-xl font-semibold'>
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
            <div className='relative mx-auto flex justify-between items-center my-6 sm:w-96 lg:w-125'>
              <CarouselIndicator
                className='relative max-w-min'
              />
              <CarouselNavigation
                className='relative -bottom-10 w-full justify-end gap-2 max-w-min'
                classNameButton='bg-zinc-800 *:stroke-zinc-50 dark:bg-zinc-200 dark:*:stroke-zinc-800'
                alwaysShow
                enableInfinite={carouselCustom && enableInfinite}
                carouselTimer={carouselCustom && carouselTimer}
                secondsTimer={(carouselCustom && carouselTimer) ? secondsTimer : 0}
              />
            </div>
          </Carousel>
        </div>
      }
    </section>
  )
}

export default TestimonialSection