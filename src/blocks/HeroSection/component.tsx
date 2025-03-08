import { HeroSectionProps } from '@/types/blockTypes'

const HeroSection: React.FC<HeroSectionProps> = ({
  sectionId,
  title,
  subtitle,
  description,
  image,
  disableInnerContainer = false
}) => {
  // console.log('image', image)
  return (
    <section aria-label='section' id={sectionId}>
      <div>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <div>{description}</div>
      </div>
      <div>
      </div>
    </section>
  )
}

export default HeroSection