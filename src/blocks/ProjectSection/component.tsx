import Pill from '@/components/_styled/Pill'
import { Heading1 } from '@/components/_styled/Heading'
import { type ProjectSectionBlockProps } from '@/types/blockTypes'

const ProjectSection: React.FC<ProjectSectionBlockProps> = ({
  sectionId,
  pill,
  heading,
  description,
  callToAction,
  projects
}) => {
  return (
    <section
      data-testid={sectionId as string}
      id={sectionId as string}
      className='relative z-50 lg:py-24 px-5 py-10'
    ></section>
  )
}

export default ProjectSection