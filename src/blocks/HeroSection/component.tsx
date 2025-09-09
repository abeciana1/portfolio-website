import ImageComponent from '@/src/blocks/Image/component'
import { Heading1, Heading2 } from '@/components/_styled/Heading'
import clsx from 'clsx'
import { innerContainer, limitContainer } from '@/utils/helpers'
import {
  type HeroSectionProps,
  type ArrowDirection,
  type CTAStyle,
  type CTALink
} from '@/types/blockTypes'
import CallToAction from '@/src/blocks/CallToAction/component'
import ButtonGroup from '@/components/_styled/ButtonGroup'

const HeroSection: React.FC<HeroSectionProps> = ({
  sectionId,
  title,
  subtitle,
  description,
  enableInnerContainer,
  secondaryBlurb,
  callToAction,
  media = [],
  greyBackground = false
}) => {
  const {
    gradient,
    gradientXFlip,
    gradientYFlip,
    gradientSelect,
    image,
    forcedHeight,
    forcedWidth
  } = media && media[0]

  return (
    <section
      aria-label='section'
      id={sectionId}
      className={clsx('relative flex flex-col md:flex-row gap-5 lg:gap-10 xl:gap-40 items-center mx-auto', {
        [innerContainer]: enableInnerContainer,
        [limitContainer]: !enableInnerContainer,
        ['bg-pillGrey dark:bg-darkGrey']: greyBackground
      })}
    >
      <div className='lg:max-w-[550px] md:max-w-[400px] space-y-6'>
        <Heading1 text={title as string} />
        {subtitle && <Heading2 text={subtitle as string} />}
        <div className='leading-10 text-3xl font-semibold min-h-[5.5rem]'>{description}</div>
        {secondaryBlurb && <div className='text-xl text-darkGrey font-semibold'>{secondaryBlurb}</div>}
        {(callToAction && callToAction?.length > 0) &&
          <ButtonGroup alignment='left'>
            {callToAction?.map((callToAction, index) => {
              return (
                <CallToAction
                  key={index}
                  style={callToAction.style as CTAStyle}
                  arrow={callToAction.arrow as boolean}
                  arrowDirection={callToAction.arrowDirection as ArrowDirection}
                  link={callToAction.link as CTALink}
                  eventLocation={`Hero Section w/ Image - ${sectionId}`}
                  cursorLabel={callToAction.cursorLabel as string}
                />
              )
            })}
          </ButtonGroup>
        }
      </div>
      <ImageComponent
        image={image}
        gradient={gradient as boolean}
        gradientXFlip={gradientXFlip as boolean}
        gradientYFlip={gradientYFlip as boolean}
        gradientSelect={gradientSelect}
        forcedHeight={forcedHeight}
        forcedWidth={forcedWidth}
        priority
      />
    </section>
  )
}

export default HeroSection