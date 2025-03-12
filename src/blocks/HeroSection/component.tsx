import { HeroSectionProps } from '@/types/blockTypes'
import ImageComponent from '@/src/blocks/Image/component'
import { Heading1, Heading2 } from '@/components/_styled/Heading'
import clsx from 'clsx'
import { innerContainer } from '@/utils/helpers'

const HeroSection: React.FC<HeroSectionProps> = ({
  sectionId,
  title,
  subtitle,
  description,
  enableInnerContainer,
  callToAction,
  media
}) => {
  console.log('enableInnerContainer', enableInnerContainer)
  const {
    gradient,
    gradientXFlip,
    gradientYFlip,
    gradientSelect,
    image,
  } = media && media[0]
  return (
    <section
      aria-label='section'
      id={sectionId}
      className={clsx('relative flex flex-col md:flex-row gap-5 lg:gap-10 xl:gap-40 items-center mx-auto max-w-fit', {
        [innerContainer]: enableInnerContainer
      })}
    >
      <div className='lg:max-w-[500px] md:max-w-[400px]'>
        <Heading1 text={title as string} />
        <Heading2 text={subtitle as string} />
        <div className='leading-loose text-xl font-semibold'>{description}</div>
      </div>
      <ImageComponent
        image={image}
        gradient={gradient}
        gradientXFlip={gradientXFlip}
        gradientYFlip={gradientYFlip}
        gradientSelect={gradientSelect}
      />
    </section>
  )
}

export default HeroSection