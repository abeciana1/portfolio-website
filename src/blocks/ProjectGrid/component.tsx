import {
  type ProjectSectionBlockProps
} from '@/types/blockTypes'
import ProjectCard from '@/components/_projects/ProjectCard'

const ProjectGrid: React.FC<Pick<ProjectSectionBlockProps, 'projects'>> = ({
  projects
}) => {
  console.log('projects list', projects)
  return (
    <section>
      {projects?.map((project) => {
        return <></>
      })}
    </section>
  )
}

export default ProjectGrid