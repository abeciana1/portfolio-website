import {
  type SkillsSectionProps,
  type GradientOptions
} from '@/types/blockTypes'
import { Heading1 } from '@/components/_styled/Heading'
import { sectionContainer } from '@/utils/helpers'
import { payload } from '@/src/payload'
import { QueryClient } from '@tanstack/react-query'
import Skill from '@/components/_styled/Skill'
import { type Skill as SkillType } from '@/src/payload-types'
import { CMSMediaT } from '@/types/general'
import Gradient from '@/components/_styled/Gradient'

const fetchSkillsList = async (queryClient: QueryClient, collectionId: number) => {
  return await queryClient.ensureQueryData({
    queryKey: ['skills'],
    queryFn: () =>
      payload.findByID({
        collection: 'skills-collection',
        id: collectionId,
        depth: 2,
        overrideAccess: true,
      }),
    staleTime: process.env.NODE_ENV === 'production' ? 60 * 1000 * 10 * 3 : 60 * 1000,
  })
}

const SkillsSection: React.FC<SkillsSectionProps> = async ({
  sectionId,
  heading,
  skillsCollection,
  gradient,
  gradientSelect
}) => {
  const queryClient = new QueryClient()
  const skillsContent = await fetchSkillsList(queryClient, skillsCollection?.id)
  return (
    <section
      id={sectionId}
      className={`relative ${sectionContainer}`}
    >
      {(gradient && gradientSelect) &&
        <div className='max-w-48 max-h-20'>
          <Gradient
            variant={gradientSelect as GradientOptions}
            forcedWidth='20rem'
            forcedHeight='2rem' 
          />
        </div>
      }
      <Heading1 text={heading} />
      <section className='py-5 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-10'>
        {skillsContent?.skills && skillsContent?.skills
        .filter((skill): skill is SkillType => typeof skill !== 'number')
        .map((skill: SkillType) => (
          <Skill
            key={skill?.id}
            title={skill?.title}
            skillIcon={skill.skillIcon as CMSMediaT}
          />
        ))}
      </section>
    </section>
  )
}

export default SkillsSection