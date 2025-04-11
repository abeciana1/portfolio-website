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
import Pill from '@/components/_styled/Pill'

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
  pill,
  description,
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
        <div className='relative flex flex-col gap-6 z-[9999] text-center md:max-w-2xl mx-auto'>
          <Pill text={pill} />
          <Heading1 text={heading} />
          <div className='text-darkGrey dark:text-pillGrey text-xl font-semibold'>
            {description}
          </div>
        </div>
        {(gradient && gradientSelect) &&
          <div className='z-0 absolute top-44 left-0 md:left-8 rounded-full h-56 sm:h-[25rem] md:h-[20rem] w-[50rem] overflow-hidden blur-3xl sm:opacity-70'>
            <Gradient
              variant={gradientSelect as GradientOptions}
            />
          </div>
        }
        <div className="z-50 relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-6 max-w-fit mx-auto mt-6">
          {skillsContent?.skills && skillsContent?.skills
          .filter((skill): skill is SkillType => typeof skill !== 'number')
          .map((skill: SkillType) => (
            <Skill
              key={skill?.id}
              title={skill?.title}
              skillIcon={skill.skillIcon as CMSMediaT}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default SkillsSection