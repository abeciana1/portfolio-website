import { type SkillsSectionProps } from '@/types/blockTypes'
import { Heading1 } from '@/components/_styled/Heading'
import { sectionContainer } from '@/utils/helpers'
import { payload } from '@/src/payload'
import { QueryClient } from '@tanstack/react-query'

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
  skillsCollection
}) => {
  const queryClient = new QueryClient()
  const skillsContent = await fetchSkillsList(queryClient, skillsCollection?.id)
  console.log('skillsContent', skillsContent)
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