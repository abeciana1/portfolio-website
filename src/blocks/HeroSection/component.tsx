import { HeroSectionProps } from '@/types/blockTypes'
import ImageComponent from '@/src/blocks/Image/component'

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
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
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