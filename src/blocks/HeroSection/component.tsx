import { HeroSectionProps } from '@/types/blockTypes'
import ImageComponent from '@/src/blocks/Image/component'
import { Heading1, Heading2 } from '@/components/_styled/Heading'

const HeroSection: React.FC<HeroSectionProps> = ({
  sectionId,
  title,
  subtitle,
  description,
  disableInnerContainer = false,
  callToAction,
  media
}) => {
  const {
    gradient,
    gradientXFlip,
    gradientYFlip,
    gradientSelect,
    image,
  } = media && media[0]
  return (
    <section aria-label='section' id={sectionId}>
      <div>
        <Heading1 text={title as string} />
        <Heading2 text={subtitle as string} />
        <div>{description}</div>
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