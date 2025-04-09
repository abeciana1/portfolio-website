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
    <>
      <section
        id={sectionId}
        className={`relative w-full ${sectionContainer}`}
      >
        <Heading1 text={heading} />
        <div className="z-50 relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 max-w-fit mx-auto mt-6">
          {(gradient && gradientSelect) &&
            <div className='-z-10 absolute top-0 left-5 sm:top-2 md:-top-5 sm:left-10 md:left-20 rounded-full h-56 w-56 sm:h-[25rem] sm:w-[30rem] md:h-[20rem] md:w-[40rem] overflow-hidden blur-3xl'>
              <Gradient
                variant={gradientSelect as GradientOptions}
              />
            </div>
          }
          {skillsContent?.skills && skillsContent?.skills
          .filter((skill): skill is SkillType => typeof skill !== 'number')
          .map((skill: SkillType) => (
            <Skill
              key={skill?.id}
              title={skill?.title}
              skillIcon={skill.skillIcon as CMSMediaT}
            />
          ))}
          {(gradient && gradientSelect) &&
            <div className="-z-10 absolute bottom-0 right-5 sm:bottom-2 md:bottom-32 sm:right-10 md:right-20 rounded-full h-56 w-56 sm:h-[25rem] sm:w-[35rem] md:h-[20rem] md:w-[40rem] overflow-hidden blur-3xl">
              <Gradient 
                variant={gradientSelect as GradientOptions}
                gradientXFlip={false} 
                gradientYFlip={true} 
              />
            </div>
          }
        </div>
      </section>
    </>
  )
}

export default SkillsSection