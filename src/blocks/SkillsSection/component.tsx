import { type SkillsSectionProps } from '@/types/blockTypes'
import { Heading1 } from '@/components/_styled/Heading'
import { sectionContainer } from '@/utils/helpers'

const SkillsSection: React.FC<SkillsSectionProps> = ({
  sectionId,
  heading,
  skillsCollection
}) => {
  console.log('skillsCollection', skillsCollection)
  return (
    <section
      id={sectionId}
      className={`${sectionContainer}`}
    >
      <Heading1 text={heading} />
      <section className='py-5'></section>
    </section>
  )
}

export default SkillsSection