import ImageComponent from '@/src/blocks/Image/component'
import { Heading1, Heading2 } from '@/components/_styled/Heading'
import clsx from 'clsx'
import { innerContainer, limitContainer } from '@/utils/helpers'
import { type HeroSectionProps } from '@/types/blockTypes'

const HeroSection: React.FC<HeroSectionProps> = ({
  sectionId,
  title,
  subtitle,
  description,
  enableInnerContainer,
  callToAction,
  media = []
}) => {

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
      className={clsx('relative flex flex-col md:flex-row gap-5 lg:gap-10 xl:gap-40 items-center mx-auto', {
        [innerContainer]: enableInnerContainer,
        [limitContainer]: !enableInnerContainer
      })}
    >
      <div className='lg:max-w-[550px] md:max-w-[400px] space-y-6'>
        <Heading1 text={title as string} />
        <Heading2 text={subtitle as string} />
        <div className='leading-10 text-3xl font-semibold'>{description}</div>
      </div>
      <ImageComponent
        image={image}
        gradient={gradient as boolean}
        gradientXFlip={gradientXFlip as boolean}
        gradientYFlip={gradientYFlip as boolean}
        gradientSelect={gradientSelect}
      />
    </section>
  )
}

export default HeroSection