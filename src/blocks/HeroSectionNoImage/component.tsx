import { Heading1, Heading2 } from '@/components/_styled/Heading'
import {
  type HeroSectionNoImageBlockProps,
  type ArrowDirection,
  type CTAStyle,
  type CTALink
} from '@/types/blockTypes'
import CallToAction from '@/src/blocks/CallToAction/component'
import ButtonGroup from '@/components/_styled/ButtonGroup'

const HeroSectionNoImage: React.FC<HeroSectionNoImageBlockProps> = ({
  sectionId,
  title,
  subtitle,
  description,
  secondaryBlurb,
  callToAction,
}) => {
  return (
    <section
      aria-label='section'
      id={sectionId}
      data-testid={sectionId}
      className='relative flex flex-col md:flex-row gap-5 lg:gap-10 xl:gap-40 lg:py-24 px-5 py-10 items-center mx-auto'
    >
      <div className='space-y-6 text-center'>
        <Heading1 text={title as string} />
        {subtitle && <Heading2 text={subtitle as string} />}
        <div data-testid='description' className='leading-10 text-3xl font-semibold'>{description}</div>
        {secondaryBlurb && <div data-testid='secondary-blurb' className='text-xl text-darkGrey font-semibold'>{secondaryBlurb}</div>}
        {(callToAction && callToAction?.length > 0) &&
          <ButtonGroup>
            {callToAction?.map((callToAction, index) => {
              return (
                <CallToAction
                  key={index}
                  style={callToAction.style as CTAStyle}
                  arrow={callToAction.arrow as boolean}
                  arrowDirection={callToAction.arrowDirection as ArrowDirection}
                  link={callToAction.link as CTALink}
                />
              )
            })}
          </ButtonGroup>
        }
      </div>
    </section>
  )
}

export default HeroSectionNoImage